export default function handler(req: any, res: any) {
  const apiKey = process.env.REAL_API_KEY;
  if (!apiKey) return res.status(500).json({ status: "error", message: "REAL_API_KEY 未設定" });

  res.status(200).json({
    status: "ok",
    service: "Global Corp Banking System",
    version: "1.0.0",
    buildId: process.env.NEXT_PUBLIC_BUILD_ID || "local",
    environment: process.env.NEXT_PUBLIC_ENV || "DEV",
    licenseStatus: "valid",
    licenseId: process.env.LICENSE_ID || "corp-license-001",
    corpId: process.env.CORP_ID || "corp-xyz",
    timestamp: new Date().toISOString(),
  });
}
