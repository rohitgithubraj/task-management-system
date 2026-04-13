const Topbar = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <a className="navbar-brand">Main Dashboard</a>
            <form className="form-inline">
                <input 
                    className="form-control mr-sm-2" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search" 
                />
                <button 
                    className="btn btn-outline-light my-2 my-sm-0" 
                    type="submit"
                >
                    Search
                </button>
                
            </form>
        </nav>
    );
}

export default Topbar;