import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WalletContextProvider from './components/WalletProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateCollection from './pages/CreateCollection';
import Collections from './pages/Collections';
import CollectionDetails from './pages/CollectionDetails';
import MintNFT from './pages/MintNFT';
import NFTDetails from './pages/NFTDetails';
import HowItWorks from './pages/HowItWorks';
import Roadmap from './pages/Roadmap';
import Creating from './pages/Creating';
import Explorer from './pages/Explorer';

function App() {
  return (
    <WalletContextProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collection/:id" element={<CollectionDetails />} />
              <Route path="/create-collection" element={<CreateCollection />} />
              <Route path="/mint-nft" element={<MintNFT />} />
              <Route path="/nft/:id" element={<NFTDetails />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/creating" element={<Creating />} />
              <Route path="/explore" element={<Explorer />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </WalletContextProvider>
  );
}

export default App;
