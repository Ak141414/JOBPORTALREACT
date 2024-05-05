import "./App.css";
import Navbar from "./components/Navbar.js";
import Roles from "./components/Roles.js";

import Experience from "./components/Experience.js";
import MinBasePay from "./components/Minbasepay.js";
import Location from "./components/Location.js";
import Company from "./components/Company.js";
import AvailableJobs from "./components/Availablejobs.js";
import { useState, useEffect, useCallback } from "react";
import { CircularProgress, Typography } from "@mui/material";
function App() {
  const [joblist, setJoblist] = useState([]);
  const [filteredJobList, setFilteredJoblist] = useState([]);
  const [jobcount, setJobcount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [offset, setOffset] = useState(0);
  const [companyNames, setCompanyNames] = useState([]);
  const [locations, setLocations] = useState([]);
  const [jobRole, setJobRole] = useState([]);

  const [filter, setFilter] = useState({
    companyName: [],
    jobRole: [],
    location: [],
    experience: null,
    salary: null,
  }); /// For filtering job based on selected values

  const pageSize = 10;

  const fetchData = useCallback(() => {
    if (!hasMoreData || isLoading) return;

    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit: pageSize,
      offset: offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then(async (response) => {
        const values = await response.json();
        setJoblist((prevJobs) => [...prevJobs, ...values.jdList]);
        setJobcount(values.totalCount);
        setOffset((prevOffset) => prevOffset + 1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [offset, isLoading, hasMoreData]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterJobList(filter, joblist);
  }, [filter]);

  useEffect(() => {
    setHasMoreData(joblist.length < jobcount); ////Removing duplicates in getting API response
    const companyNameFilter = [];
    const locationNameFilter = [];
    const rolesNameFilter = [];
    joblist.forEach((jobDetails) => {
      if (
        companyNameFilter.findIndex(
          (filter) => filter.companyName === jobDetails.companyName
        ) === -1
      ) {
        companyNameFilter.push({ companyName: jobDetails.companyName });
      }
      if (
        locationNameFilter.findIndex(
          (filter) => filter.location === jobDetails.location
        ) === -1
      ) {
        locationNameFilter.push({ location: jobDetails.location });
      }
      if (
        rolesNameFilter.findIndex(
          (filter) => filter.jobRole === jobDetails.jobRole
        ) === -1
      ) {
        rolesNameFilter.push({ jobRole: jobDetails.jobRole });
      }
    });
    setJobRole(rolesNameFilter);
    setCompanyNames(companyNameFilter);
    setLocations(locationNameFilter);
    filterJobList(filter, joblist);
  }, [joblist, jobcount]);

  const filterJobList = (filter, jobList) => {
    setFilteredJoblist(
      jobList.filter((jobDetails) => {
        return (
          (filter.companyName.length === 0 ||
            (filter.companyName.length &&
              filter.companyName.includes(jobDetails.companyName))) &&
          (filter.jobRole.length === 0 ||
            (filter.jobRole.length &&
              filter.jobRole.includes(jobDetails.jobRole))) &&
          (filter.location.length === 0 ||
            (filter.location.length &&
              filter.location.includes(jobDetails.location))) &&
          (filter.experience === null ||
            (filter.experience &&
              jobDetails.minExp <= parseInt(filter.experience) &&
              parseInt(filter.experience) <= jobDetails.maxExp)) &&
          (filter.salary === null ||
            (filter.salary &&
              jobDetails.minJdSalary <= parseInt(filter.salary) &&
              parseInt(filter.salary) <= jobDetails.maxJdSalary))
        );
      })
    );
  };

  useEffect(() => {
    /// For handling infinite scroll
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 40
      ) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  return (
    <div className="App">
      <Navbar />
      <div className="Filters">
        <Experience filter={filter} setFilter={setFilter} />
        <Company
          filter={filter}
          setFilter={setFilter}
          companyNames={companyNames}
        />
        <Location filter={filter} setFilter={setFilter} locations={locations} />

        <Roles
          filter={filter}
          setFilter={setFilter}
          jobRole={jobRole}
          joblist={joblist}
        />
        <MinBasePay filter={filter} setFilter={setFilter} />
      </div>
      <div className="AvailableJobs">
        {filteredJobList.length !== 0 ? (
          filteredJobList.map((item) => <AvailableJobs {...item} />)
        ) : (
          <Typography variant="h5" gutterBottom>
            No result found
          </Typography>
        )}
      </div>
      {isLoading && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default App;
