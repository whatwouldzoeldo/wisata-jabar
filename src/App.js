import React, { useState } from "react";
import axios from "axios";
import query from "qs";
import "./App.css";

function App() {
  const [value, setValue] = useState({
    items: [],
    input: "",
  });

  const getDataTitles = async () => {
    const BASE_URL = "http://localhost:3030/wisbar/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX md: <http://www.wisatajabar.com/wisatadatad#>
  
      SELECT ?titles ?kota ?types ?alamat ?telpon
        WHERE
        {
          ?m     md:titles ?titles ;
          md:kota ?kota ;
          md:types ?types ;
          md:alamat  ?alamat ;
          md:telpon ?telpon ;
          FILTER regex(?titles, "${value.input}") 
        }`,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: query.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((items, index) =>
        formatter(items, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        items: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getDataProvinces = async () => {
    const BASE_URL = "http://localhost:3030/wisbar/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX md: <http://www.wisatajabar.com/wisatadatad#>
  
      SELECT ?titles ?kota ?types ?alamat ?telpon
        WHERE
        {
          ?m     md:titles ?titles ;
          md:kota ?kota ;
          md:types ?types ;
          md:alamat  ?alamat ;
          md:telpon ?telpon ;
          FILTER regex(?kota, "${value.input}") 
        }`,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: query.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((items, index) =>
        formatter(items, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        items: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getDataTypes = async () => {
    const BASE_URL = "http://localhost:3030/wisbar/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX md: <http://www.wisatajabar.com/wisatadatad#>
  
      SELECT ?titles ?kota ?types ?alamat ?telpon
      WHERE
      {
        ?m     md:titles ?titles ;
        md:kota ?kota ;
        md:types ?types ;
        md:alamat  ?alamat ;
        md:telpon ?telpon ;
          FILTER regex(?types, "${value.input}") 
        }`,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: query.stringify(queryData),
      });
      console.log(data);

      
      const formatted_data = data.results.bindings.map((items, index) =>
        formatter(items, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        items: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const formatter = (items, index) => {
    return {
      d: index,
      titles: items.titles.value,
      kota: items.kota.value,
      types: items.types.value,
      alamat: items.alamat.value,
      telpon: items.telpon.value,
    };
  };

  const handleChange = (event) => {
    setValue({
      ...value,
      input: event.target.value,
    });
  };

  return (
    <div className="">
      <div className="App">
        
        
      </div>
      <div className="titleBox">
        <span className="titleInformation">
        <br/>
        Pencari Wisata Jawa Barat
        </span>
      </div>
      <div className="searchBarDisplay" style={{marginTop: 200}}>
        <div className="searchBar">
          <input
            onChange={handleChange}
            id="search"
            type="text"
            className=""
            placeholder="Search Test"
            required="required"
          ></input>
        </div>
        <button
          className="getData"
          onClick={function (event) {
            getDataTitles();
            getDataProvinces();
            getDataTypes();
          }}
        >
          <span>Find</span>
        </button>
        <button className="getAll" onClick={function (event) {}}>
          <span>Lihat Semua</span>
        </button>
      </div>
        <div className="information">
          <ol>
            {value.items.map((item, i) => (
              <li key={i} className="listBox">
                <div className="itemBox">
                  <div className="">
                    <h2>{item.titles}</h2>
                  </div>
                  <h3 className="">
                    {item.kota}
                    <br />
                  </h3>
                  Tipe Wisata : {item.types}
                  <br />
                  Alamat : {item.alamat}
                  <br />
                  No. Telepon : {item.telpon}
                  <br />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>  
  );
}

export default App;
