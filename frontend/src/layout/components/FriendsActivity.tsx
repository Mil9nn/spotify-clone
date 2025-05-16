import { useChatStore } from '@/store/useChatStore';
import { HeadphonesIcon, Music2, Users } from 'lucide-react';
import { useEffect } from 'react';


const FriendsActivity = () => {
  const { getUsers, users } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (users.length === 0) return <LoginPrompt />;

  return (
    <div className="p-2">
      <div className="p-4 shadow-md space-y-4 rounded-md bg-zinc-900 h-[86vh]">
        <h2 className="flex items-center gap-3 mb-5 border-b-2 border-zinc-700 pb-2">
          <Users />
          <span>What they're listening to</span>
        </h2>
        {users.map((user) => (
          <div key={user._id} className="flex items-center space-x-4">
            {/* Profile Picture with Online Dot */}
            <div className="relative">
              <img
                src={user.imageUrl}
                alt={user.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              {user.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>

            {/* Name and Song Info */}
            <div>
              <div className="text-gray-300 font-semibold">{user.fullName}</div>
              <div className="flex items-center text-sm text-gray-500">
                <Music2 className="w-4 h-4 mr-1" />
                <span>Listening to <span className="italic">{user.song}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsActivity;

const LoginPrompt = () => (
  <div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
    <div className='relative'>
      <div
        className='absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
        aria-hidden='true'
      />
      <div className='relative bg-zinc-900 rounded-full p-4'>
        <HeadphonesIcon className='size-8 text-emerald-400' />
      </div>
    </div>

    <div className='space-y-2 max-w-[250px]'>
      <h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
      <p className='text-sm text-zinc-400'>Login to discover what music your friends are enjoying right now</p>
    </div>
  </div>
);
