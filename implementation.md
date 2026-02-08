# Leseni Crypto Integration: Split Sheets + Oracle Architecture and PRD

## Executive Summary
Leseni integrates crypto to represent music royalty split sheets on-chain, ensuring enforceable settlement, transparent payouts, and provable ownership. Chartmetric serves as an external oracle to validate and enrich music works’ metadata. InstantDB remains the real-time application state layer for marketplace UX, listings, and analytics. Settlement uses USDC on a low-fee L2 (Base or Polygon).

## Objectives
- On-chain source of truth for splits, settlement, and payouts
- Oracle-backed metadata and identity for works (Chartmetric)
- Fast, real-time marketplace UX backed by InstantDB
- Security, compliance (KYC/AML), and governance baked in

## System Architecture
- On-chain contracts:
  - SplitSheetFactory: deploys SplitSheet per work; registers in MusicWorkRegistry.
  - SplitSheet: stores participants’ shares (basis points), validates distribution math, accepts royalty deposits, distributes proportionally; optional ERC‑1155 positions for transferability.
  - RoyaltyVault: holds USDC and orchestrates proportional payouts or Merkle claims.
  - MusicWorkRegistry: maps ISRC/Chartmetric IDs to SplitSheet addresses.
  - OracleVerifier: verifies signed Chartmetric payloads; updates registry/splitsheet metadata digest.
- Oracle service:
  - Fetch Chartmetric artist/track metadata (e.g., GetArtistMetadata).
  - Build canonical payload: workId, ISRC, Chartmetric IDs, participants+shares, timestamp, nonce, version.
  - Sign payload (ECDSA) with authorized oracle key; post via OracleUpdater contract.
- Off-chain app layer:
  - InstantDB: caches and enriches on-chain events; powers UI components (catalog, listings, dashboards).
  - Indexer: subscribes to contract events and performs idempotent upserts into InstantDB.
  - Next.js app: wagmi + wallet integration for signing and transaction UX.

## Smart Contract Suite
- SplitSheetFactory
  - Creates SplitSheet instances and initializes participant shares and governance roles.
  - Emits SplitSheetCreated(workId, splitSheetAddress).
- SplitSheet
  - Immutable work identifiers (ISRC, Chartmetric track/artist IDs) stored at creation.
  - Participant shares in basis points (sum must equal 10,000).
  - Accepts USDC deposits and distributes proportionally.
  - Optional: mints ERC‑1155 position tokens representing shareBps for transfer/trading.
  - Governance: multi-sig + timelock; split changes require quorum.
- RoyaltyVault
  - Escrows funds prior to distribution; supports proportional push or Merkle claim mode.
  - Emits PayoutDistributed(workId, epochId, totalAmount).
- MusicWorkRegistry
  - Canonical map: ISRC / chartmetricTrackId → splitSheetAddress.
  - Used by marketplace, indexer, and oracle verification.
- OracleVerifier
  - Authorized oracle keys registry; verifies ECDSA signatures.
  - Writes payload digest to registry or SplitSheet; emits MetadataUpdated(workId, digest).

## Oracle Strategy (Chartmetric)
- Source: Chartmetric API (e.g., GetArtistMetadata) for artist/track data.
- Payload schema (signed off-chain JSON):
  - workId, isrc, chartmetric.artistId/name, chartmetric.trackId/name
  - participants: [{ address, role, shareBps }]
  - timestamp, nonce, version
- On-chain validation:
  - Verify signature against OracleVerifier’s authorized keys.
  - Check timestamp freshness; reject stale payloads.
  - Update metadata digest and emit events for indexing.

## Data Models (InstantDB)
- works: workId, isrc, chartmetricArtistId, chartmetricTrackId, splitSheetAddress, chainId, lastOracleDigest, updatedAt
- catalogs: contractAddress, tokenId, chainId
- listings: marketAddress, onChainListingId, chainId, reservePrice, minBidIncrement, endTime, escrowTxHash
- positions: holderAddress, tokenId, contractAddress, chainId, shareBps, mintTxHash
- cashflows: distributorAddress, epochId, merkleRoot, depositTxHash

## Protocol Flows
- Create Split Sheet
  - Creator submits participants+shares; server action validates sum=10,000 bps.
  - Factory deploys SplitSheet and registers in MusicWorkRegistry.
  - Optional ERC‑1155 tokens minted to participants proportional to shares.
- Oracle Metadata Update
  - Oracle service fetches Chartmetric metadata and signs payload.
  - OracleUpdater posts payload; OracleVerifier verifies and records digest; emits events.
  - Indexer updates InstantDB; UI shows verified metadata.
- Deposit & Distribute Royalties
  - Admin or pipeline deposits USDC into RoyaltyVault.
  - SplitSheet distributes proportionally (push) or via Merkle root claims (gas-efficient).
  - Emits distribution events; InstantDB reflects epochs and payouts.
- Marketplace Settlement
  - Auctions/fixed-price: escrow USDC; settlement mints/assigns ERC‑1155 positions or updates SplitSheet shares.
  - Events drive InstantDB updates for real-time UI.

## Frontend Integration
- Wallet connect: wagmi + RainbowKit/Coinbase SDK; chain switching and signing.
- KYC gating: UI checks EAS attestation; contracts enforce checks server-side.
- Real-time updates: subscribe to InstantDB; optimistic UI with event confirmation.
- Claims UI: show epochs; generate Merkle proofs and claim payouts.

## Security & Governance
- Contracts: OpenZeppelin AccessControl, Pausable, ReentrancyGuard; audits before production.
- Oracle: authorized key rotation, payload canonicalization, replay protection (nonce+timestamps).
- Governance: multi-sig + timelock for split updates; dispute resolution process.
- Risk controls: circuit breakers for payouts/marketplace; pause on anomalies.

## DevOps & Indexing
- Tooling: Hardhat/Foundry, unit tests, deployment scripts.
- Indexer: Alchemy/Infura websockets; idempotent upserts into InstantDB (txHash+logIndex).
- Observability: logs/metrics/traces; dashboards for auctions, payouts, indexer health.
- Backups and DR; periodic reconciliation against chain state.

## Environment & Config
- NEXT_PUBLIC_CHAIN_ID, NEXT_PUBLIC_RPC_URL
- NEXT_PUBLIC_USDC_ADDRESS
- NEXT_PUBLIC_SPLITSHEET_FACTORY_ADDRESS
- NEXT_PUBLIC_ORACLE_VERIFIER_ADDRESS
- NEXT_PUBLIC_CHARTMETRIC_BASE_URL
- CHARTMETRIC_API_TOKEN (server-side)
- NEXT_PUBLIC_INSTANT_APP_ID, INSTANT_TOKEN (admin)

## Phased Roadmap
- P0: SplitSheetFactory + SplitSheet + RoyaltyVault; end-to-end deposit → distribution on testnet; KYC gating; escrow settlement; observability.
- P1: OracleVerifier + OracleUpdater service; Chartmetric metadata attestations; ERC‑1155 positions; secondary market; analytics dashboards.
- P2: Merkle distributor claims with claims UI; streaming payouts (optional); custodial wallets; internationalization; developer APIs/webhooks.
- P3: Advanced governance, dispute resolution automation, anomaly detection models; audits and mainnet/L2 go‑live.

## Comprehensive Feature Set
- Marketplace
  - Faceted search, saved filters, watchlists; alerts (outbid/reserve met/ending soon)
  - Auctions: proxy bidding, anti-sniping extensions; buy-now and make-offer; price history
  - Secondary market: ERC‑1155 trading of positions; fees; liquidity metrics
  - Deal room: secure data room, versioning, access logs, audit trails
- Creator Tools
  - Split sheet manager (proposal → review → multi‑sig approval → on-chain)
  - Earnings importer and reconciliation (CSV/PDF parsing)
  - Valuation tools: comparables, yield calculators, sensitivity analysis
  - Rights verification: ISRC/ISWC checks, provenance proofs, PRO/publisher integration
- Data & Oracles
  - Multi-source redundancy: Chartmetric + MusicBrainz + Spotify/Apple
  - Identity linking: ENS, verified socials, distributor IDs, attestations
  - Health scores: completeness, conflict detection (duplicate ISRCs, share sums)
  - Tamper-evident logs: signed payload history, digest timeline
- Payments & Payouts
  - Dual rails: USDC L2 + fiat on/off ramps; transparent fee accounting
  - Streaming payouts (Superfluid); statements; tax support; multi-currency display
- Security
  - Contract audits; reentrancy guards; pausable flows; secure key management
  - App: rate limiting, bot protection, CSP, secure headers, secret rotation, dependency scanning
  - RBAC: granular permissions for actions; admin scopes
  - Bug bounty and responsible disclosure program
- Compliance
  - KYC/AML + sanctions; EAS attestation gating
  - Jurisdiction-aware flows; GDPR compliance; data retention schedules
  - Terms/consent tracking; regulatory audit logs
- Performance
  - Edge-first: ISR/SSG, CDN caching; image optimization
  - Real-time where needed; batch/queue heavy jobs; indexed InstantDB fields
  - Profiling and caching for valuation/analytics queries
- Reliability
  - Observability: dashboards for health; circuit breakers; retries; idempotency keys
  - Backups/DR; chaos tests; incident runbooks; status page; postmortems
- UX
  - Guided onboarding; microcopy; empty states; optimistic interactions
  - Accessibility; localization; mobile-first layouts; theming
- Governance
  - Split amendments via multi-sig + timelock; dispute resolution flows
  - Transparent change history; on-chain attestations
  - Upgrade strategy with proxies and timelocks
- Analytics
  - Investor: yield, ROI, diversification, payout predictability
  - Creator: earnings trends, reserve hit probability
  - Marketplace: GMV, bid velocity, conversion funnels
  - Controlled A/B testing with guardrails
- Integrations
  - Wallets: wagmi/RainbowKit/Coinbase; custodial wallet option
  - Payments: fiat processors; KYT tools
  - Notifications: email/push/webhooks; user preferences
  - Partner APIs: REST/GraphQL; webhooks
- Trust & Moderation
  - Anomaly detection (wash trading, bid manipulation); velocity checks
  - Verification badges; manual review queues; community reporting
  - Transparency reports
- SEO & Growth
  - Structured data, sitemaps, canonical, OG/Twitter cards
  - Referral/affiliates; content hubs; performance budgets in CI
- Internationalization
  - Multi-language UI, region-specific legal copy, currency display options
- Developer Experience
  - Staging/sandbox/testnet; fixtures; SDKs; typed clients; CI/CD with e2e tests

---

## Product Requirements Document (PRD)

### Product Vision
Leseni is the one-stop platform for creating, trading, and managing music royalty assets with cryptographic integrity, oracle-backed metadata, and equitable payouts.

### Target Users
- Creators (artists, songwriters, publishers)
- Investors (retail and professional)
- Admins (compliance, operations)

### Assumptions
- USDC settlement on L2 (Base/Polygon)
- Chartmetric provides reliable artist/track metadata
- Users complete KYC; contracts enforce attestations

### User Stories
- Creator creates a split sheet with participants and shares; obtains on-chain registry entry.
- Oracle updates work metadata from Chartmetric; app shows verified identity.
- Admin deposits royalties to a work; participants receive proportional payouts.
- Investor buys positions via marketplace; ownership reflected on-chain; portfolio updates in real time.
- Holder claims payouts for an epoch via Merkle distributor.

### Functional Requirements
- Split sheets:
  - Create/edit (governed updates); validate shares sum; role-based permissions
  - Registry lookup by ISRC/chartmetric IDs
- Oracle:
  - Verify signed Chartmetric payloads; record digest; event emission
- Marketplace:
  - Auctions/fixed-price; escrow USDC; settlement triggers mint/update
  - Secondary market for positions; fee schedule; price history
- Payouts:
  - Deposit funds; proportional distribution; epochs; Merkle claims UI
- KYC/Compliance:
  - On-chain EAS attestations; bid/buy gates; audit logs
- Indexing/State:
  - Event listeners; idempotent upserts; periodic reconciliation
- Analytics:
  - Portfolio metrics; earnings trends; GMV/bid velocity dashboards
- Notifications:
  - Real-time alerts (outbids, distributions, approvals)

### Non-Functional Requirements
- Performance: sub‑second UI interactions, paginated lists, indexed queries
- Security: audits; reentrancy protection; secure secrets; CSP
- Reliability: retries/backoff; idempotency; DR; observability dashboards
- Accessibility: WCAG 2.1; localization; mobile-first

### Success Metrics
- Time to settlement; payout correctness rate; GMV; active listings; claim success rate
- KYC completion rate; indexer event lag; error budgets within SLOs

### Rollout Plan
- Testnet deployments; internal dogfooding; staged feature flags
- Audit completion → public beta → mainnet/L2 launch
- Continuous monitoring and feedback loops

### Acceptance Criteria
- SplitSheet creation/updates verified and auditable
- Oracle updates recorded on-chain and mirrored in InstantDB within seconds
- End‑to‑end deposit → distribution flow completes with accurate payouts
- Marketplace settlement correctly mints/transfers positions and updates UI
- KYC gating enforced both on-chain and in UI

### Risks & Mitigations
- Oracle dependency: add multi-source redundancy; cache and cross-verify
- Regulatory changes: modular compliance layer; jurisdiction toggles
- Smart contract bugs: audits, formal checks, pause switches, timelocks


