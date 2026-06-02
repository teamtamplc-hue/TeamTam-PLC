# Security Specification: Waitlist Collection

## 1. Data Invariants
- Only authenticated and email-verified users can create or modify waitlist documents.
- A user can only write to their own document under `/waitlist/{uid}` where `uid` matches `request.auth.uid`.
- Document key values are strictly validated (no malicious injections or ghost fields).
- Timestamps `createdAt` and `updatedAt` are server-generated and validated.

## 2. The "Dirty Dozen" Payloads
These payloads represent attempts to breach access control:
1. Impersonation Check: Create `/waitlist/evil_uid` with `ownerId: "evil_uid"` while authenticated as `user_uid`. (Expected: Denied)
2. Unauthenticated Write: Create `/waitlist/any_uid` without an auth token. (Expected: Denied)
3. Unverified Email: Create `/waitlist/user_uid` with `email_verified: false` in token. (Expected: Denied)
4. Cross-User Update: Write to `/waitlist/victim_uid` when logged in as `attacker_uid`. (Expected: Denied)
5. Modifying Immutable Fields: Update `/waitlist/user_uid` attempting to alter `createdAt` after creation. (Expected: Denied)
6. Ghost Field Injection: Try to save a document containing an unmapped property like `role: "admin"`. (Expected: Denied)
7. ID Poisoning: Save under a malicious ID path containing SQL or directory traversal characters. (Expected: Denied)
8. Value Poisoning: Supply a giant string > 2KB into `email` or `fullName`. (Expected: Denied)
9. Self-Elevated Privilege: Change `ownerId` from `victim_uid` to `attacker_uid` during an update. (Expected: Denied)
10. Sibling Overwrite: Update key properties not listed in the standard actions list. (Expected: Denied)
11. Spoofing timestamps: Provide client-side values for `createdAt` instead of `request.time`. (Expected: Denied)
12. Bulk download: Run a query to read all waitlist submissions. (Expected: Denied)

## 3. Test Scopes
The security rules compiled under `/firestore.rules` will explicitly block each pattern using high-performance boolean logic.
