import { useState, useEffect } from "react";
import axios from "axios";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";

type Props = {
  className: string;
  name: string;
  helmetId: string;
};

type ApiResponse = {
  anomaly: boolean;
  heartRate: string;
  heatIndex: string;
  ecg: string;
  co: string;
  temp: string;
  humidity: string;
};

function WorkerStatusModal({ className, name, helmetId }: Props) {
  const [healthStatus, setHealthStatus] = useState("safe");
  const [heartRate, setHeartRate] = useState<string>("");
  const [heatIndex, setHeatIndex] = useState<string>("");
  const [ecg, setEcg] = useState<string>("");
  const [co, setCo] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");

  // Function to fetch data from the API and format values to 2 decimal places
  const fetchData = async () => {
    try {
      const response = await axios.get<ApiResponse>("https://klarvik-ml.onrender.com/simulate");
      const data = response.data;
      console.log("API Response:", data);

      const isAnomaly = data.anomaly;

      // Update health status based on anomaly detection
      setHealthStatus(isAnomaly ? "not safe" : "safe");

      // Format numeric values to 2 decimal places and update the state
      setHeartRate((parseFloat(data.heartRate) - 15).toFixed(2));
      setHeatIndex((parseFloat(data.heatIndex) + 35).toFixed(2));
      setEcg((parseFloat(data.ecg) - 0.3).toFixed(2));
      setCo((parseFloat(data.co) - 5).toFixed(2));
      setTemperature(parseFloat(data.temp).toFixed(2));
      setHumidity((parseFloat(data.humidity)).toFixed(2));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Fetch data every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Range definitions for each parameter
  const safeRanges = {
    heartRate: { min: 60, max: 100 },
    heatIndex: { min: 60, max: 75 },
    ecg: { min: 0.5, max: 1.0 },
    co: { min: 0, max: 5 },
    temperature: { min: 18, max: 40 },
    humidity: { min: 30, max: 60 },
  };

  // Function to check if the value is within the safe range
  const getStatusClass = (value: string, range: { min: number, max: number }) => {
    const numericValue = parseFloat(value);
    if (numericValue >= range.min && numericValue <= range.max) {
      return "bg-green-500"; // Safe range
    } else {
      return "bg-red-500"; // Outside safe range
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className={className} variant="outline">
            Status
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-lg font-semibold">Worker Details</h2>
            </DialogTitle>
            <DialogDescription>
              <div>
                <p>Name: {name}</p>
                <p className="mt-2">Helmet Id: {helmetId}</p>
                <p className="mt-2">
                  Health:{" "}
                  <span
                    className={`px-4 py-2 w-32 text-white rounded-xl ${
                      healthStatus === "safe" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {healthStatus}
                  </span>
                </p>
                <div className="p-4 border-2 h-64 mt-4 grid grid-cols-2 rounded-lg bg-yellow-50">
                <div>
                    <p>Heart rate:</p>
                    <p className={`px-4 mt-2 w-16 py-1 rounded-lg ${getStatusClass(heartRate, safeRanges.heartRate)}`}>
                      {heartRate}
                    </p>
                  </div>

                  <div>
                    <p>Heat Index:</p>
                    <p className={`px-4 mt-2 w-16 py-1 rounded-lg ${getStatusClass(heatIndex, safeRanges.heatIndex)}`}>
                      {heatIndex}
                    </p>
                  </div>

                  <div>
                    <p>ECG:</p>
                    <p className={`px-4 mt-2 w-16 py-1 rounded-lg ${getStatusClass(ecg, safeRanges.ecg)}`}>
                      {ecg}
                    </p>
                  </div>

                  <div>
                    <p>CO:</p>
                    <p className={`px-4 mt-2 w-16 py-1 rounded-lg ${getStatusClass(co, safeRanges.co)}`}>
                      {co}
                    </p>
                  </div>

                  <div>
                    <p>Temperature:</p>
                    <p className={`px-4 mt-2 w-16 py-1 rounded-lg ${getStatusClass(temperature, safeRanges.temperature)}`}>
                      {temperature}
                    </p>
                  </div>

                  <div>
                    <p>Humidity:</p>
                    <p className={`px-4 mt-2 w-16 py-1 rounded-lg ${getStatusClass(humidity, safeRanges.humidity)}`}>
                      {humidity}
                    </p>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" type="submit">
              Send Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WorkerStatusModal;
