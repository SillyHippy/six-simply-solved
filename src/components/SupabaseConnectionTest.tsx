
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";

export function SupabaseConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [clients, setClients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      setIsLoading(true);
      
      // Attempt to fetch clients as a test
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .limit(5);
      
      if (error) {
        console.error("Supabase connection error:", error);
        setConnectionStatus('error');
        toast({
          title: "Database connection error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log("Successfully connected to Supabase:", data);
        setConnectionStatus('connected');
        setClients(data || []);
        toast({
          title: "Connected to database",
          description: `Found ${data?.length || 0} clients in the database`,
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setConnectionStatus('error');
      toast({
        title: "Unexpected error",
        description: err instanceof Error ? err.message : "Failed to connect to database",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h3 className="text-lg font-medium mb-2">Supabase Connection Status</h3>
      
      <div className="space-y-2">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${
            connectionStatus === 'checking' ? 'bg-yellow-500' :
            connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <p>
            {connectionStatus === 'checking' ? 'Checking connection...' :
             connectionStatus === 'connected' ? 'Connected to Supabase' : 
             'Connection error'}
          </p>
        </div>
        
        {connectionStatus === 'connected' && clients.length > 0 && (
          <div className="mt-4">
            <p className="font-medium">Found {clients.length} clients:</p>
            <ul className="mt-2 space-y-1 pl-5 list-disc">
              {clients.map((client) => (
                <li key={client.id}>{client.name}</li>
              ))}
            </ul>
          </div>
        )}
        
        {connectionStatus === 'connected' && clients.length === 0 && (
          <p className="text-yellow-600">Connected successfully, but no clients found in database.</p>
        )}
        
        <Button 
          onClick={checkConnection} 
          disabled={isLoading}
          size="sm"
          className="mt-2"
        >
          {isLoading ? "Checking..." : "Test Connection"}
        </Button>
      </div>
    </div>
  );
}
