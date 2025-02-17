```mermaid
flowchart TD
    A[revo.co.za] -->B(apply.revo.co.za)
    B --> C[Paystack]
    C --> D{Get Verified}
    D --> |Successful| E[HubSpot]
    D --> |Unsuccessful| F[Email to Applicant]
    F --> B
```