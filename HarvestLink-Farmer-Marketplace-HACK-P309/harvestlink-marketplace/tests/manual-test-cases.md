# Manual API / workflow test cases

Run these against localhost or the deployed URL. Use two browser profiles (farmer and buyer) so cookies do not overwrite each other.

| ID | Scenario | Expected result |
|---|---|---|
| T01 | Register with valid farmer details | 201, farmer session created |
| T02 | Register duplicate email | 409 |
| T03 | Register password shorter than 8 chars | 400 |
| T04 | Farmer creates listing | 201, product saved |
| T05 | Buyer attempts to create listing | 403 |
| T06 | Public user browses products | 200 |
| T07 | Buyer orders quantity within stock | 201, stock decreases |
| T08 | Buyer orders quantity above stock | 409, no order |
| T09 | Farmer accepts own order | 200 |
| T10 | Different farmer updates order | 404 |
| T11 | Farmer marks accepted order ready | 200 |
| T12 | Farmer completes ready order | 200 |
| T13 | Farmer cancels requested order | 200, stock restored |
| T14 | Buyer attempts farmer status update | 403 |

Record actual response codes and screenshots during your team's test run. This file is a test plan, not evidence that tests have already been executed.
