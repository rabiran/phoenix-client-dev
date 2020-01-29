const things = {
    dev: 'http://localhost:3005',
    prod: '',
    test: 'https://country.register.gov.uk/records.json?page-size=5000',
}
export default { 
    backend: things.dev  // change this to prod, if your react client in backend.
}