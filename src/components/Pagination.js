import React from 'react';
import { Pagination } from 'react-bootstrap';


export function Paging({total, limit, page, handlePaginationItemClick}) {
  const pagination = paginate(total, limit, page);

  if (total <= limit){
    return (
      <div></div>
    );
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => handlePaginationItemClick(1)}/>
      {pagination.pages.map((value, index) => {
        if (value === page){
          return <Pagination.Item active onClick={() => handlePaginationItemClick(value)} key={index}>{value}</Pagination.Item>
        }
        else{
          return <Pagination.Item onClick={() => handlePaginationItemClick(value)} key={index}>{value}</Pagination.Item>
        }
      })}
      <Pagination.Last onClick={() => handlePaginationItemClick(pagination.lastPage)}/>
    </Pagination>
  );
}

function paginate(total, limit, currentPage){
    let pages = (total % limit) === 0 ? Math.floor(total / limit) : Math.floor(total / limit) + 1 ;
    // retieve pagination
    let f_size = [-2, -1, 0 , 1, 2];
    let pg = [0, 0, 0, 0, 0];

    for(let i=0; i < 5; ++i){
      if(currentPage + f_size[i] >= 1 && currentPage + f_size[i] <= pages){
        pg[i] = currentPage + f_size[i];
      }
    }

    for(let i=0; i < 5; ++i){
      if(pg[i] === 0 && f_size[i] > 0){
        let ind = f_size[0] - f_size[i];
        if(currentPage + ind >= 1 && currentPage + ind <= pages){
          pg[i] = currentPage + ind;
        }
      }
      if(pg[i] === 0 && f_size[i] < 0){
        let ind = f_size[4] - f_size[i];
        if(currentPage + ind >= 1 && currentPage + ind <= pages){
          pg[i] = currentPage + ind;
        }
      }
    }
    // filter to deletes zero elements
    pg = pg.filter( a => a !== 0);
    // sort array
    pg = pg.sort((a, b) => a -b);

    return {pages: pg, lastPage: pages}
}
