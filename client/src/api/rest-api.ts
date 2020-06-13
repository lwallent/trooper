
/**
 * Very simple backend communication for now
 * 
 * @param token JWT token
 * @param path the patht get
 */
export const restGet = async (token: string, path: string) => {
    try {
        const response = await fetch(path, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.json();

    } catch (error) {
        console.error(error);
    }
};

export const restCreate = async  <T>(token: string, path: string, data: T): Promise<T|undefined> => {
    try {
        const response = await fetch(path, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
            
        return response.json();
    } catch (error) {
        console.error(error);
    }
}