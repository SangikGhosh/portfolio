import axios from 'axios';
import { useEffect, useState } from 'react';

const Mygithub = () => {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchReposAndProfile = async () => {
      try {
        const repoResponse = await axios.get('https://api.github.com/users/SangikGhosh/repos?visibility=all', {
          headers: {
            Authorization: `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`, // Use your token here
          },
        });

        const profileResponse = await axios.get('https://api.github.com/users/SangikGhosh');
        
        setRepos(repoResponse.data);
        setProfile(profileResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchReposAndProfile();
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white p-6">
      <div className="flex items-center mb-6">
        <img
          src={profile.avatar_url}
          alt="Profile"
          className="w-20 h-20 rounded-full mr-4 border-4 border-gray-300 dark:border-gray-700"
        />
        <h1 className="lg:text-4xl text-2xl sm:text-3xl font-bold">{profile.name}</h1>
      </div>

      <h2 className="text-2xl font-semibold mb-4">GitHub Repositories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="bg-[#1a1a1a] p-3 rounded-lg shadow-md hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold bg-[#1a1a1a]">{repo.name}</h3>
            <p className="text-lg text-gray-400 bg-[#1a1a1a]">{repo.description || "No description"}</p>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 block bg-[#1a1a1a] text-base"
            >
              View Repository
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mygithub;
