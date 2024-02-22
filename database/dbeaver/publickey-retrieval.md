# Fixing "MySQL 8+ Public Key Retrieval is not allowed" in DBeaver

![Screenshot](https://miro.medium.com/v2/resize:fit:828/format:webp/1*AC3S82JvFcc4OagiN2UG9g.png)

## Overview

This guide addresses the issue of encountering "MySQL 8+ Public Key Retrieval is not allowed" error in DBeaver, and provides steps to resolve it.

For a detailed walkthrough, please refer to the original article: [DBeaver — แก้ปัญหา MySQL 8+ Public Key Retrieval is not allowed](https://wk-j.medium.com/dbeaver-%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2-mysql-8-public-key-retrieval-is-now-allowed-ae2b6b425fd4)

## Instructions

1. Open DBeaver and navigate to the desired connection.
2. Click on "Edit Connection" and go to the "Driver Properties" tab.
3. Locate the property `allowPublicKeyRetrieval` and set its value to `TRUE`.

![Step-by-Step](https://miro.medium.com/v2/resize:fit:828/format:webp/1*R4cv3VxOmIUXzmy_VnCCIw.png)

By following these steps, you can resolve the issue and successfully connect to your MySQL 8+ database using DBeaver.
