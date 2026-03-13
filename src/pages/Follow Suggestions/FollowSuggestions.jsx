import axios from 'axios';
import React, { useState } from 'react';
import { baseUrl } from '../../MainData';
import { useInfiniteQuery } from '@tanstack/react-query';
import SuggestFollewer from '../../comps/SuggestFollewercomp';
import { Button, Spinner } from '@heroui/react';

export default function FollowSuggestions() {
 
    const [searchTerm,setSearchTerm]=useState("")
  const fetchSuggestions = ({ pageParam = 1 }) => {
    return axios.get(`${baseUrl}/users/suggestions?page=${pageParam}&q=${searchTerm}`, {
      headers: {
        "AUTHORIZATION": `Bearer ${localStorage.getItem("token")}`
      }
    });
  };

 
  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteQuery({
    queryKey: ["Suggested",searchTerm],
    queryFn: fetchSuggestions,
    initialPageParam: 1, 
    getNextPageParam: (lastPage, allPages) => {
      const suggestions = lastPage?.data?.data?.suggestions;
      if (!suggestions || suggestions.length === 0) {
        return undefined; 
      }
      return allPages.length + 1;
    }
  });
console.log(data?.pages);

  if (isLoading) return <Spinner />;

  return (

    <div className="flex flex-col gap-4 p-3">
        <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search users..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-slate-700 bg-slate-800 text-white rounded-xl focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            
            {page?.data?.data?.suggestions?.map((suggest) => (
              <div key={suggest._id} className='border border-primary rounded-2xl'>
                <SuggestFollewer 
                  name={suggest.name} 
                  userName={suggest.username ?? "UserName"} 
                  image={suggest.photo} 
                  id={suggest._id}
                />
              </div>
            ))}
            
          </React.Fragment>
        ))}
        
      </div>

      <Button 
        color="primary" 
        onPress={() => fetchNextPage()} 
        isLoading={isFetchingNextPage}
        isDisabled={!hasNextPage} 
      >
        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
      </Button>
    </div>
  );
}