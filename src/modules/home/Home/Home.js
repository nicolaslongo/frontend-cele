import React, { useState } from 'react';
import { Button } from "antd";
import Select from 'react-select'
import axios from 'axios';
import _ from 'lodash';
import Loader from 'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import ProyectCard from '../../app/components/ProyectCard';

import './Home.css';

const Home = ({history}) => {
    const [inputText, setInputText] = useState('');
    const [searchWasMade, setSearchWasMade] = useState(false);
    const [currentlySearching, setCurrentlySearching] = useState(false);
    const [selectedValue, setSelectedValue] = useState('todos');
    const [documentosFiltrados, setDocumentosFiltrados] = useState([])

    const ENDPOINT = '/search_argentina/'

    const handleSubmit = () => {
      setCurrentlySearching(true);
      console.log("Currently searching " + currentlySearching)
      setDocumentosFiltrados([]);
      setCurrent([])
      search();
    };

    const onSelectedInput = (s) => {
      setSelectedValue(s.value);
    }
  
    const options = [
      { value: 'todos', label: 'Todos' },
      { value: 'proyectoDeLey', label: 'Proyecto de Ley' },
      { value: 'ley', label: 'Ley' }
    ]

    const search = () => {
      const url = process.env.REACT_APP_BACKEND_URL + ENDPOINT + 
        '?filter=' + inputText + '&type=' + selectedValue

      axios.get(url, {
        headers: {
          'Content-type': 'application/json'
        },
        crossorigin: true
      })
      .then(response => {
          setDocumentosFiltrados(response.data);
          setSearchWasMade(true);
          setCurrentlySearching(false);
          if(response.data.length <= numberPerPage) {
            setCount({prev:0, next:response.data.length})
            setCurrent(response.data.slice(0, response.data.length))
          } else {
            setCount({prev:0, next:numberPerPage})
            setCurrent(response.data.slice(0, numberPerPage))
          }
        })
      .catch((error) => {
        setCurrentlySearching(false);
        console.log("Codigo de error " + error.status + ", mensaje: " + error.message)
      })
    }

  const numberPerPage = 25;
  const [count, setCount] = useState({
    prev: 0,
    next: numberPerPage
  })
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState([])
  const [currentlyLoading, setCurrentlyLoading] = useState(false);
  const getMoreData = () => {
    if (current.length === documentosFiltrados.length) {
      console.log("No hay mas: " + current.length)
      setHasMore(false);
      return;
    }
    setCurrentlyLoading(true)
    console.log("Count es " + count.prev + " " + count.next)
    setTimeout(() => {
      setCurrent(current.concat(documentosFiltrados.slice(count.prev + numberPerPage, count.next + numberPerPage)))
      setCurrentlyLoading(false)
    }, 2000)
    setCount((prevState) => ({ prev: prevState.prev + numberPerPage, next: prevState.next + numberPerPage }))
  }

    return (
        <>
          <h3>Observatorio CELE</h3>

        <div className='search-container'>
          <h2 className='search-header'> Búsqueda </h2>
          <input className='input-text'
            type="text"
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)} />
          {/* </p> */}
          <Select className='select-type' options={options} defaultValue={options[0]} onChange={onSelectedInput} /> 
        </div>

          <Button
            onClick={() => {
              handleSubmit();
            }}
            shape="square"
            className="submit-button"
            color="#EE9795"
            size={20}
          >
            {" "}Buscar{" "}
          </Button>
          
      {
        searchWasMade && !currentlySearching && 
          <div>
            <h3> Tu búsqueda arrojó {documentosFiltrados.length} resultados</h3>
          </div>
      }
      <div className="loader">
        {
          currentlySearching && 
            <Loader
              type="Oval"
              color="#E56361"
              height={60}
              width={60}
            />
        }
      </div>

      <InfiniteScroll
        dataLength={current.length}
        next={getMoreData}
        hasMore={hasMore} >
        {
          _.map(current, (proy, index) => {
            return(
              <ProyectCard history={history} key={index} proyect={proy}></ProyectCard>
            )})
        }

      <div className="loader">
        {
          currentlyLoading && 
            <Loader
              type="Oval"
              color="#E56361"
              height={60}
              width={60}
            />
        }
      </div>

      </InfiniteScroll>
      
        </>
      );
}

export default Home;