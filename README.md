# ⭕ CircleShare - Sharing flows in circles

*Fair as a circle. Warm as sharing.* CircleShare transforms expense sharing into circles of sharing where support flows continuously.

A decentralized platform where sharing works best when it flows in circles, not lines. Built on Stacks Bitcoin L2 with Clarity smart contracts for transparency, security, and permanence.

**Where sharing comes full circle.** ✨

Built for the **Stacks Vibe Coding Hackathon 2025** 🏆

## 🌟 Features

### ⭕ **Circle-Centered Sharing**
- **Create Your Circle**: Start circles of sharing with friends, family, or community—everyone equal, no hierarchy
- **Share Contribution**: Transparent contribution tracking where everyone gives when they can, everyone receives when they need
- **Flow Share Forward**: Support flows naturally through your circle—complete the circle when you can
- **Fair as a Circle**: Circular reciprocity model—no linear debt tracking, only circle balance
- **Support Anywhere**: Distance doesn't matter. Your circle connects hearts across the world
- **Warm & Balanced**: Every interaction designed with fairness and compassion

### 🎨 **Beautiful, Flowing Design**
- **Teal & Purple Gradients**: Flow + sharing—colors that evoke circular flow and human connection
- **Flowing Animations**: Ripple effects, circular rotations, and interactions that feel continuous
- **Human-Centered Loading**: "Finding your circles..." instead of cold progress bars
- **Glass-Effect UI**: Backdrop blur and soft transparency for a modern, welcoming feel
- **Circle-Based Feedback**: Flowing circles and hearts throughout the app

## 💜 **CircleShare Brand Philosophy**

CircleShare embodies four core personality pillars that guide every design decision:

### 🌊 **Warm & Flowing**
*"Sharing flows in circles."* Support moves naturally through the community, like water finding its course. Warm, continuous, unstoppable.

### 🔵 **Clear & Balanced**
*"Fair as a circle."* A circle is perfectly balanced—everyone equal distance from center. We believe transparency and fairness build trust.

### 💪 **Empowering & Inclusive**
*"Everyone belongs in the circle."* Circles have no outsiders. CircleShare ensures everyone feels valued, included, and empowered to participate.

### 🎯 **Humble but Purposeful**
*"Quietly keeping sharing flowing."* We solve real problems without fanfare, focusing on what matters: making sharing flow naturally through communities.

**Design Language**: Teal + purple gradients represent the flow of sharing and human connection. Circular animations make interactions feel continuous. Every loading state, button hover, and transition is crafted to embody circular reciprocity.

## 🏗️ Architecture

### Smart Contracts
- **Clarity Smart Contracts**: Built on Stacks Bitcoin L2
- **expensess-factori**: Creates and manages circles of sharing
- **groups-treasuri**: Handles contribution tracking, sharing, and settlements
- Built with Clarity for decidability, safety, and readability on Bitcoin L2

### Frontend
- **Next.js 15** with React 19 for modern, fast interactions
- **TypeScript** for type safety and developer confidence
- **Tailwind CSS** with custom CircleShare design system
- **Custom RainbowKit Theme** seamlessly integrated with teal/purple branding
- **wagmi v2** and **RainbowKit** for smooth Web3 experiences
- **Viem** for reliable blockchain interactions
- **Circular Flow Animations** with CSS transforms and keyframes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Leather Wallet, Xverse, or compatible Stacks wallet
- STX on Stacks Testnet (get from [faucet](https://explorer.hiro.so/sandbox/faucet?chain=testnet))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd circleshare
   ```

2. **Install contract dependencies**
   ```bash
   cd contracts
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Smart Contract Deployment

1. **Configure environment**
   ```bash
   cd contracts
   cp .env.example .env
   # Edit .env with your Stacks credentials
   ```

2. **Deploy to Stacks Testnet**
   ```bash
   npm run deploy:stacks
   ```

3. **Verify contracts (optional)**
   ```bash
   npm run verify <CONTRACT_ADDRESS>
   ```

### Frontend Setup

1. **Configure environment**
   ```bash
   cd frontend
   cp .env.example .env.local
   # Update with deployed contract address and WalletConnect project ID
   ```

2. **Update contract address**
   The deployment script automatically updates `frontend/lib/contracts.ts` with the deployed factory address.

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

## ⭕ How to Use CircleShare

### 1. **Connect Your Wallet** 💜
- Open CircleShare in your browser
- Click "Connect Wallet" to connect your Stacks wallet
- Ensure you're on Stacks Testnet
- *Your wallet is now ready to start sharing in circles*

### 2. **Create Your Circle** ⭕
- Click "Create Your Circle" to start a circle of sharing
- Give your circle a meaningful name like "Family Circle" or "Community Share"
- Choose how others will see you (your nickname in this circle)
- Confirm the transaction ✨

### 3. **Invite to Circle** 🤗
- Open your circle
- Click "Invite to Circle" to add members
- Enter their Stacks address and a nickname
- *Only circle keepers can invite new members - maintaining circle integrity*

### 4. **Share Contribution** 💜
- Click "Share Contribution" when expenses happen
- Describe the expense (like "Sarah's Recovery Circle" or "Group Dinner")
- Enter the amount and select who participated
- Watch as sharing flows transparently through your circle

### 5. **See How Sharing Flows** 📊
- View your circle's share balance (who's contributed, who needs to flow share forward)
- Positive balance = share flowing to you 💜
- Negative balance = time to flow share forward ⭕
- *Every transaction tells a story of circular reciprocity*

### 6. **Flow Share Forward** ✨
- When it's time to complete the circle, click the amount
- Send exactly what's needed - fair as a circle
- *Sharing flows naturally through the circle*

## 🔧 Configuration

### Network Configuration
- **Network**: Stacks Testnet
- **Chain**: Bitcoin Layer 2
- **RPC URL**: https://api.testnet.hiro.so
- **Explorer**: https://explorer.hiro.so/?chain=testnet
- **Faucet**: https://explorer.hiro.so/sandbox/faucet?chain=testnet

### Environment Variables

#### Contracts (.env)
```bash
STACKS_PRIVATE_KEY=... # Your deployment wallet private key
STACKS_NETWORK=testnet
CONTRACT_ADDRESS=... # Deployed contract address
```

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_STACKS_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=... # Deployed factory address
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=... # Your WalletConnect project ID
```

## 🧪 Testing

### Smart Contracts
```bash
cd contracts
npm run test
npm run compile # Compile contracts
```

### Frontend
```bash
cd frontend
npm run build # Test build
npm run type-check # TypeScript checking
npm run lint # ESLint
```

## 📂 Project Structure

```
circleshare/
├── contracts/                     # Clarity smart contracts for trust & transparency
│   ├── contracts/
│   │   ├── groups-treasuri.clar  # Core sharing & contribution logic
│   │   └── expensess-factori.clar # Circle creation & management
│   ├── scripts/
│   │   └── deploy.js              # Stacks blockchain deployment
│   ├── test/                      # Comprehensive security tests
│   └── Clarinet.toml              # Stacks L2 configuration
├── frontend/                      # CircleShare web application
│   ├── app/                       # Next.js app router (pages & layouts)
│   │   ├── page.tsx               # Landing page with hero section
│   │   ├── dashboard/             # Your circles overview
│   │   ├── groups/[id]/           # Individual circle management
│   │   ├── about/                 # CircleShare story & values
│   │   ├── how-it-works/          # Step-by-step sharing guide
│   │   └── globals.css            # CircleShare design system & animations
│   ├── components/                # Reusable UI components
│   │   └── ui/                    # Button, Input, Card with CircleShare styling
│   ├── lib/                       # Web3 hooks, utils, & contract interactions
│   └── types/                     # TypeScript definitions
└── README.md                      # You are here! ⭕
```

## 🔐 Security Considerations

- Clarity smart contracts are decidable and safer than Solidity
- Only circle keepers can add members
- Share settlements require exact payment amounts
- All transactions are transparent on Stacks blockchain
- Secured by Bitcoin's Layer 2

## 🌐 Deployment

### Smart Contracts
Contracts are deployed on Stacks Testnet:
- Explorer: https://explorer.hiro.so/?chain=testnet

### Frontend
The frontend can be deployed to any static hosting service:
- Vercel (recommended)
- Netlify
- GitHub Pages

```bash
cd frontend
npm run build
npm run start # Production server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🏆 Hackathon Submission

This project was built for the **Stacks Vibe Coding Hackathon 2025** with a focus on:
- Circular reciprocity model for expense sharing
- Clarity smart contracts on Bitcoin L2
- Modern Web3 UX with warm, human-centered design
- Real-world utility with fair-as-a-circle approach

### Demo Video
[Link to demo video will be added]

### Live Demo
[CircleShare](https://circleshare.vercel.app/)

## 📞 Support

- **Stacks Documentation**: https://docs.stacks.co/
- **Clarity Documentation**: https://docs.stacks.co/clarity/
- **Issues**: Create an issue in this repository

## ⭕ Growing CircleShare

*The future of circular sharing:*

### 🔮 **Vision for Tomorrow**
- **Circle Notifications**: Get updates when sharing flows through your circle
- **Receipt Intelligence**: AI-powered scanning to make expense tracking effortless
- **Multi-Currency Circles**: Support for worldwide circles of sharing
- **Mobile Circles**: Native mobile app for sharing on-the-go
- **Optimized Flow**: Gas optimization to keep more value flowing where it's needed
- **Circle Analytics**: Beautiful insights showing how sharing circulates

### 🤗 **Join Our Community**
- **Share your story**: How has CircleShare helped your circle?
- **Suggest improvements**: What would make circular sharing even better?
- **Build together**: Developers welcome to help complete the circle

---

## 💜 **About This Project**

CircleShare was born from the understanding that **sharing works best when it flows in circles, not lines.**

Traditional apps create linear debts. We saw people struggling with awkward debt conversations, forgotten contributions, and the guilt that "owing" creates between loved ones. CircleShare transforms expense sharing into circles of sharing where support flows continuously.

Built with conviction for the **Stacks ecosystem** and belief that blockchain's greatest power lies in making peer-to-peer support feel as natural and continuous as sharing with loved ones.

*Where sharing comes full circle.* ⭕✨

---

**Made with 💜 for the Stacks ecosystem - CircleShare: Where sharing flows in circles**
