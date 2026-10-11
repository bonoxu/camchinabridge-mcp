# Cambridge China Bridge — MCP server

A free, public, remote [Model Context Protocol](https://modelcontextprotocol.io) server for **importing goods from China into the UK**: UK duty rates and landed cost, anti-dumping checks, UK compliance requirements, Chinese New Year planning, sea vs air, and China's import rules for UK exporters.

- **Endpoint:** `https://camchinabridge.co.uk/mcp` (Streamable HTTP, stateless)
- **Auth:** none. No sign-in, no API key.
- **Registry name:** `uk.co.camchinabridge/sourcing` (official MCP Registry)
- **Server card:** `https://camchinabridge.co.uk/.well-known/mcp/server-card.json`
- **Operator:** Cambridge China Bridge, a trading name of Piggy Pineapple Ltd, registered in England and Wales, company no. 14385590. Website: https://camchinabridge.co.uk

This repository holds descriptions only. The server runs on camchinabridge.co.uk; the tool list below is generated from the live server.

## Connect

**Claude (claude.ai / Desktop):** Settings → Connectors → Add custom connector → URL `https://camchinabridge.co.uk/mcp`.

**ChatGPT (developer mode) / any MCP client:** add a remote MCP server with the URL above and no authentication.

**Config file clients (Cursor, Cline, VS Code, Gemini CLI):**

```json
{
  "mcpServers": {
    "cambridge-china-bridge": {
      "url": "https://camchinabridge.co.uk/mcp"
    }
  }
}
```

## Tools

<!-- tools:start -->
| Tool | Title | What it does | Type |
| --- | --- | --- | --- |
| `find_duty_rate` | Find a UK duty rate | Use when the user asks what duty rate or commodity code applies to a product imported from China to the UK: finds the UK commodity code and import duty rate from a product description (English or Chinese) or a commodity code. | read-only |
| `estimate_landed_cost` | Estimate UK import duty and VAT | Use when the user asks how much duty and VAT they will pay to import goods from China to the UK: estimates customs value, UK import duty, import VAT and the total, with the same arithmetic as the site's import duty calculator. | read-only |
| `estimate_container_space` | Estimate carton volume and full-container space | Use when the user asks for the CBM of a shipment or how many containers a carton line needs: estimates CBM, shipment weight and volume-only 20ft/40ft/high-cube container counts from one carton line. | read-only |
| `check_anti_dumping` | Check for anti-dumping duty on Chinese goods | Use when the user asks whether extra anti-dumping or countervailing duty applies to goods from China, or when find_duty_rate flags it: checks whether a UK measure applies on a commodity code, from the live UK Trade Tariff. | read-only |
| `find_uk_compliance` | Find UK compliance requirements | Use when the user asks which UK rules, markings or certificates a product imported from China needs: lists the UK regulatory regimes (UKCA, WEEE, PSTI, toy safety, food contact, REACH, packaging EPR and others) that apply to a type of product, with what to ask the supplier for. | read-only |
| `search_guides` | Search the importing guides | Use for a question about importing from China to the UK that the other tools do not answer directly: searches Cambridge China Bridge's guides (duty and VAT, shipping, Incoterms, suppliers, quality, compliance, sectors). | read-only |
| `check_export_market` | Check what governs importing into a country | Use when the user asks about importing from China into a country other than the UK: for that destination country, says what actually decides whether an import from China can happen there: a standards regulator, a bank through exchange control, a local trade licence, the tax authority, a risk-based check at import, or the buyer's own choice of where conformity is checked. | read-only |
| `plan_around_chinese_new_year` | Plan an order around the Chinese New Year shutdown | Use for any question about the latest date to order from China, a Chinese New Year (Spring Festival, CNY) shipping cutoff, or whether goods arrive in time around the holiday. | read-only |
| `compare_sea_and_air` | Compare sea against air on total cost | Use when the user is choosing between air and sea freight from China: compares the two on total landed cost rather than on the freight quote, including duty charged on the freight itself, the cost of capital tied up in transit, and profit lost while stock is unavailable. | read-only |
| `check_china_import_rules` | Check what China requires to import a UK product | Use when the user asks what it takes to export a UK product to China (whisky, gin, biscuits, tea, chocolate, skincare, infant formula, pet food, cashmere, machinery and about 200 more). | read-only |
| `get_company_facts` | Check Cambridge China Bridge | Use when the user asks whether Cambridge China Bridge is legitimate or how it is paid: returns verifiable facts, namely UK company number and incorporation date (with the Companies House link), UK VAT number, registered office, trade-body membership, public review profiles, how it is paid (no supplier rebates) and what it declines. | read-only |
| `submit_enquiry` | Send an enquiry to Cambridge China Bridge | Use only when the user has asked to contact Cambridge China Bridge or to get a quote: sends the user's sourcing enquiry or quote request to them by email, and they reply to the user directly. | acts (sends an email after the user confirms) |
<!-- tools:end -->

Figures come from official sources (UK Trade Tariff, HMRC, GOV.UK) and are indicative; each tool returns its source URLs. The one tool that acts, `submit_enquiry`, only sends after the user has seen and confirmed exactly what will be sent, and is rate limited.

## Example prompts

- "What is the UK import duty and VAT on 2,000 ceramic mugs from China worth £3,000?"
- "Is there anti-dumping duty on Chinese e-bikes coming into the UK?"
- "Which UK rules apply to selling children's toys made in China?"
- "When should I order from China to have stock before Chinese New Year 2027?"
- "Sea or air for 3 cubic metres from Shenzhen to Felixstowe?"

## 中文说明

Cambridge China Bridge 提供的免费公共 MCP 服务器，帮助 AI 助手回答"从中国进口到英国"的问题：英国关税与到岸成本、反倾销、英国合规要求、春节备货、海运与空运对比，以及英国产品出口到中国的进口规则。接口地址 `https://camchinabridge.co.uk/mcp`，无需登录或 API 密钥。

## Privacy

The server stores no conversation content. Usage is counted per day and per tool without IP addresses or arguments. Enquiries sent with `submit_enquiry` are emailed to Cambridge China Bridge and handled under the website's privacy notice: https://camchinabridge.co.uk/privacy/

## License

This description (README, tools.json, server.json) is released under CC BY 4.0. The server itself is a hosted service.
