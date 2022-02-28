import React from 'react';

const SearchFilter = ({setStartDate, setEndDate}) => {
    
    const onFileter = () =>{
        setEndDate(document.getElementById('endDate').value);
        setStartDate(document.getElementById('startDate').value);
    }

    return (
        <div className="ms-content-wrapper">
            <div className='row'>
                <div className="col-md-12">
                    <div className="ms-panel">
                        <div className="ms-panel-header">
                                <h6>Search Filter</h6>
                            </div>
                        <div className="ms-panel-body">
                            <div className='row'>
                                <div class="form-group col-xl-3 col-md-12"></div>
                                <div class="form-group col-xl-3 col-md-12">
                                    <label for="startDate">Start Date</label>
                                    <input type='date' className='form-control' id="startDate" />
                                </div>
                                <div class="form-group col-xl-3 col-md-12">
                                    <label for="endDate">End Date</label>
                                    <input type='date' className='form-control' id="endDate" />
                                </div>
                                <div class="form-group col-xl-3 col-md-12"></div>
                            </div>
                            <div className='row'>
                                <div class="form-group col-xl-3 col-md-12"></div>
                                <div class="form-group col-xl-3 col-md-12">
                                  <button onClick={onFileter} className='btn btn-success'>Search</button>
                                </div>
                                <div class="form-group col-xl-3 col-md-12"></div>
                                <div class="form-group col-xl-3 col-md-12"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;