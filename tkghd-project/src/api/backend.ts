const API_URL = 'https://tkghd-project-joimuz22c-boss-projects-634a9673.vercel.app';

export const backendAPI = {
  async health() {
    const response = await fetch(`${API_URL}/api/health`);
    return response.json();
  },

  async transfer(data: any) {
    const response = await fetch(`${API_URL}/api/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Transfer failed');
    }
    
    return response.json();
  }
};
