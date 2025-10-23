'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Plus, Users, Receipt, Wallet, HandHeart, RefreshCw, Heart, Circle } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useUserGroups, useUserGroupsWithEventListener, useCreateGroup, useGroupInfo, useCreationFee, useMemberInfo, useMemberBalance, useIsMember } from '@/lib/hooks';
import { groupSync } from '@/lib/groupSync';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { formatDate, shortenAddress, formatETH } from '@/lib/utils';
import { NetworkTest } from '@/components/NetworkTest';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [nickname, setNickname] = useState('');

  const { data: userGroupAddresses, isLoading: groupsLoading, refetch: refetchGroups, error: groupsError } = useUserGroups(address);

  // Debug logging
  useEffect(() => {
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
    console.log(`[${timestamp}] Dashboard: User ${address?.slice(0, 6)}...`);
    console.log(`[${timestamp}] Dashboard: Groups loading:`, groupsLoading);
    if (groupsError) {
      console.error(`[${timestamp}] Error fetching user groups:`, groupsError);
    }
    if (userGroupAddresses) {
      console.log(`[${timestamp}] User group addresses (${userGroupAddresses.length}):`, userGroupAddresses);
    }
  }, [address, groupsLoading, groupsError, userGroupAddresses]);
  const { createGroup, isPending, isConfirming, isSuccess } = useCreateGroup();
  const { data: creationFee } = useCreationFee();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  useEffect(() => {
    if (isSuccess) {
      setShowCreateGroup(false);
      setGroupName('');
      setNickname('');
      refetchGroups();
    }
  }, [isSuccess, refetchGroups]);

  // Set up cross-tab dashboard sync
  useEffect(() => {
    if (address && refetchGroups) {
      console.log('🎯 Setting up dashboard sync for user:', address.slice(0, 6) + '...');
      groupSync.onDashboardChange(refetchGroups);
      
      return () => {
        console.log('🧹 Cleaning up dashboard sync');
        groupSync.removeListener('dashboard-refresh');
      };
    }
  }, [address, refetchGroups]);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim() && nickname.trim()) {
      createGroup(groupName.trim(), nickname.trim());
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <Card className="p-8">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Please connect your wallet</h2>
            <ConnectButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Your Circles</h1>
            <p className="text-white/80">Your circles of sharing and support</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                console.log('🔄 Manual refresh triggered');
                refetchGroups();
              }}
              variant="outline"
              size="sm"
              className="bg-circleshare-500/10 text-white border-circleshare-400/30 hover:bg-circleshare-500/20 transition-all duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Circles
            </Button>
            <ConnectButton />
          </div>
        </div>

        {/* Create Group Form */}
        {showCreateGroup && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create Your Circle</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Circle Name</label>
                  <Input
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="e.g., Sarah's Recovery Circle, Family Circle, Community Share"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Nickname</label>
                  <Input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="How should others see you in this circle?"
                    required
                  />
                </div>
                {creationFee && Number(creationFee) > 0 && (
                  <div className="text-sm text-gray-600">
                    Creation fee: {formatETH(creationFee)} ETH
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    loading={isPending || isConfirming}
                    disabled={!groupName.trim() || !nickname.trim()}
                  >
                    Create Your Circle
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateGroup(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Groups Grid */}
        <div className="grid gap-6">
          {/* Create Group Card */}
          {!showCreateGroup && (
            <Card className="border-2 border-dashed border-circleshare-400/30 hover:border-circleshare-500 bg-white/5 backdrop-blur-lg transition-all duration-300 cursor-pointer hover:scale-105">
              <CardContent
                className="flex flex-col items-center justify-center py-12 text-center"
                onClick={() => setShowCreateGroup(true)}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-circleshare-500 to-circleshare-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Create Your Circle</h3>
                <p className="text-white/70">Where sharing comes full circle</p>
              </CardContent>
            </Card>
          )}

          {/* User Groups */}
          {groupsLoading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-circleshare-500/20 to-circleshare-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4 float-animation">
                <Heart className="h-8 w-8 text-circleshare-400 animate-pulse" />
              </div>
              <div className="text-white text-lg font-medium mb-2">Finding your circles...</div>
              <div className="text-white/70">Gathering all the places where sharing flows</div>
            </div>
          ) : userGroupAddresses && userGroupAddresses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userGroupAddresses.map((groupAddress) => (
                <GroupCard 
                  key={groupAddress}
                  groupAddress={groupAddress}
                  userAddress={address}
                  onGroupClick={(addr) => router.push(`/groups/${addr}`)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-circleshare-500/20 to-circleshare-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Circle className="h-10 w-10 text-circleshare-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No circles yet</h3>
                <p className="text-white/70 mb-4">Create your first circle of share—where everyone gives, everyone receives, and sharing flows continuously</p>
                <Button onClick={() => setShowCreateGroup(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your Circle
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Network Debug Component */}
      <NetworkTest />
    </div>
  );
}

// Separate component to fetch and display group info
function GroupCard({ 
  groupAddress, 
  userAddress, 
  onGroupClick 
}: { 
  groupAddress: string; 
  userAddress?: string;
  onGroupClick: (address: string) => void;
}) {
  const { data: groupInfo, error: groupInfoError } = useGroupInfo(groupAddress);
  const { data: memberInfo, error: memberInfoError } = useMemberInfo(groupAddress, userAddress);
  const { data: balance, error: balanceError } = useMemberBalance(groupAddress, userAddress);
  const isMember = useIsMember(groupAddress, userAddress);

  // Debug logging
  useEffect(() => {
    if (groupInfoError) {
      console.error(`Error fetching group info for ${groupAddress}:`, groupInfoError);
    }
    if (memberInfoError) {
      console.error(`Error fetching member info for ${groupAddress}:`, memberInfoError);
    }
    if (balanceError) {
      console.error(`Error fetching balance for ${groupAddress}:`, balanceError);
    }
  }, [groupAddress, groupInfoError, memberInfoError, balanceError]);

  if (!groupInfo) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onGroupClick(groupAddress)}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          {groupInfo.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex text-emerald-600 items-center gap-2">
            <Wallet className="h-4 w-4" />
            {shortenAddress(groupAddress)}
          </div>
          <div className="flex text-emerald-600 items-center gap-2">
            <Receipt className="h-4 w-4" />
            Created {formatDate(groupInfo.createdAt)}
          </div>
          
          {/* Member Status */}
          {groupInfo.creator === userAddress ? (
            <div className="text-emerald-600 font-medium">
              ⭕ Circle keeper (you started this circle)
            </div>
          ) : isMember ? (
            <div className="text-teal-600 font-medium">
              🤝 You're part of this circle
            </div>
          ) : (
            <div className="text-gray-500 font-medium">
              👀 Not in this circle
            </div>
          )}

          {/* Balance Display */}
          {isMember && balance !== undefined && (
            <div className="flex items-center gap-2">
              <HandHeart className="h-4 w-4" />
              <span className={`font-medium ${Number(balance) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Number(balance) >= 0 ? '+' : ''}
                {formatETH(BigInt(balance.toString()))} ETH
              </span>
              <span className="text-xs text-gray-500">
                {Number(balance) >= 0 ? '(share flowing to you)' : '(flow share forward)'}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
