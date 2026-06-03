# DNS for AI Discovery (DNS-AID) — Setup Guide

DNS for AI Discovery (DNS-AID) enables AI agents to discover your agent endpoints through DNS using ServiceMode SVCB/HTTPS records.

## Required DNS Records

Add these records to your DNS zone (e.g., via your DNS provider's control panel):

### 1. A2A Agent Discovery Endpoint

```dns
_a2a._agents.oxiverse.com. 3600 IN SVCB 1 agent.oxiverse.com. alpn="a2a" port=443 mandatory=alpn,port
```

### 2. Index/Entry Point

```dns
_index._agents.oxiverse.com. 3600 IN SVCB 1 agent.oxiverse.com. alpn="a2a" port=443
```

### 3. DNSSEC

Ensure your DNS zone is signed with **DNSSEC** so validating resolvers return authenticated data. Most DNS providers (Cloudflare, Namecheap, etc.) offer one-click DNSSEC enablement.

## Explanation

- **SVCB (Service Binding) records** (RFC 9460) allow agents to discover service endpoints with connection parameters.
- **`_a2a._agents.oxiverse.com`** — The standard service name for Agent-to-Agent (A2A) protocol discovery.
- **`_index._agents.oxiverse.com`** — An index entry point for agents to find available services.
- **alpn="a2a"** — Application-Layer Protocol Negotiation identifier for the A2A protocol.
- **port=443** — The port where the agent service runs.

## Validation

DNS records are validated via DNS-over-HTTPS. The scanner at isitagentready.com uses Cloudflare's DNS resolver:

```http
POST https://isitagentready.com/api/scan
Content-Type: application/json

{"url": "https://oxiverse.com"}
```

Then check that `checks.discoverability.dnsAid.status` is `"pass"`.

## References

- [DNS for AI Discovery (DNS-AID) Draft](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/)
- [RFC 9460 — Service Binding and Parameter Specification](https://www.rfc-editor.org/rfc/rfc9460)
