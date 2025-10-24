const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting deployment to Base mainnet...");

  // Get deployer
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer address:", deployer.address);

  // Check Base ETH balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  if (balance === 0n) {
    console.log("⚠️  Warning: Account balance is 0. Fund your account with Base ETH:");
    console.log("🔗 Bridge: https://bridge.base.org/");
    console.log("🔗 Explorer: https://basescan.org/address/" + deployer.address);
  }

  // Deploy ExpenseFactory
  console.log("\n📄 Deploying ExpenseFactory...");
  const ExpenseFactory = await hre.ethers.getContractFactory("ExpenseFactory");
  const expenseFactory = await ExpenseFactory.deploy();

  await expenseFactory.waitForDeployment();
  const expenseFactoryAddress = await expenseFactory.getAddress();
  console.log("✅ ExpenseFactory deployed to:", expenseFactoryAddress);

  // Wait for confirmations
  const deploymentTx = expenseFactory.deploymentTransaction();
  if (deploymentTx) {
    console.log("⏳ Waiting for 3 confirmations...");
    await deploymentTx.wait(3);
  }

  // Create deployment info
  const receipt = deploymentTx ? await deploymentTx.wait() : null;
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId || "unknown",
    contracts: {
      ExpenseFactory: {
        address: expenseFactoryAddress,
        txHash: deploymentTx ? deploymentTx.hash : "unknown",
        blockNumber: deploymentTx ? receipt?.blockNumber : "unknown",
      },
    },
    deployer: deployer.address,
    deployedAt: new Date().toISOString(),
    gasUsed: {
      ExpenseFactory: receipt ? receipt.gasUsed.toString() : "unknown",
    },
  };

  // Save deployment info
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) fs.mkdirSync(deploymentsDir, { recursive: true });

  const deploymentFile = path.join(deploymentsDir, `${hre.network.name}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));

  console.log("\n📋 Deployment Summary:");
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", hre.network.config.chainId || "unknown");
  console.log("ExpenseFactory:", expenseFactoryAddress);
  console.log("Gas used:", deploymentInfo.gasUsed.ExpenseFactory);
  console.log("Deployment info saved to:", deploymentFile);

  // Save frontend constants
  const frontendDir = path.join(__dirname, "..", "..", "frontend", "lib");
  if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir, { recursive: true });

  const contractsFile = path.join(frontendDir, "contracts.ts");
  const contractsContent = `// Auto-generated contract addresses
// Generated on: ${new Date().toISOString()}
export const CONTRACTS = {
  EXPENSE_FACTORY: '${expenseFactoryAddress}' as const,
} as const;

export const NETWORK_INFO = {
  chainId: ${hre.network.config.chainId || 8453},
  name: '${hre.network.name}',
  rpcUrl: '${hre.network.config.url || "https://mainnet.base.org"}',
} as const;
`;

  fs.writeFileSync(contractsFile, contractsContent);
  console.log("Contract addresses saved for frontend:", contractsFile);

  // Quick test
  console.log("\n🧪 Testing deployed contract...");
  try {
    const totalGroups = await expenseFactory.getTotalGroupsCount();
    console.log("✅ Contract working. Total groups:", totalGroups.toString());
  } catch (error) {
    console.log("❌ Error testing contract:", error.message);
  }

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\nNext steps:");
  console.log("1. Verify on Basescan: npx hardhat verify --network base", expenseFactoryAddress);
  console.log("2. Check on explorer: https://basescan.org/address/" + expenseFactoryAddress);
  console.log("3. Fund account and test frontend connection.");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
