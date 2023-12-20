import { build } from "./build";

const siweParams = {
  domain: "example.com",
  address: "0x63C378DDC446DFf1d831B9B96F7d338FE6bd4231",
  uri: "https://example.com/login",
  version: "1",
  nonce: "12345678",
  issuedAt: "2023-10-01T00:00:00.000Z",
};

describe("build", () => {
  test("adds connect-specific parameters", () => {
    const result = build({
      ...siweParams,
      fid: 5678,
    });
    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toMatchObject({
      ...siweParams,
      statement: "Farcaster Connect",
      chainId: 10,
      resources: ["farcaster://fid/5678"],
    });
  });

  test("handles additional resources", () => {
    const result = build({
      ...siweParams,
      fid: 5678,
      resources: ["https://example.com/resource"],
    });
    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toMatchObject({
      ...siweParams,
      statement: "Farcaster Connect",
      chainId: 10,
      resources: ["farcaster://fid/5678", "https://example.com/resource"],
    });
  });
});
