import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    

    const goToNextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const goToPrevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <nav>
            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <span className="page-link" 
                        onClick={goToPrevPage} 
                        href='#'>
                        
                        Previous
                    </span>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`page-item ${currentPage === pgNumber ? 'active' : ''} `} >

                        <span onClick={() => setCurrentPage(pgNumber)}  
                            className='page-link' 
                            href='#'>
                            
                            {pgNumber}
                        </span>
                    </li>
                ))}
                <li className="page-item">
                    <span className="page-link" 
                        onClick={goToNextPage}
                        href='#'>
                        
                        Next
                    </span>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination