 //select country form api
 const [countries, setCountries] = useState([]);
 const [selectedOrigin, setSelectedOrigin] = useState('');
 useEffect(() => {
     const fetchData = async () => {
         try {
             const response = await axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json');
             const data = response.data;
             const uniqueCountries = [...new Set(data.map(city => city.country))];
             setCountries(uniqueCountries);
         } catch (error) {
             console.error('Error fetching data:', error);
         }
     };
     fetchData();
 }, []);
 const originSelectChange = (event) => {
     setSelectedOrigin(event.target.value);
 };

 //select country code from data 
 const [countriess, setCountriess] = useState([]);
 const [phoneNumber, setPhoneNumber] = useState('');
 const [selectedCountry, setSelectedCountry] = useState('');
 useEffect(() => {
     const formattedCountries = allCountries.map(country => ({
         name: country[0],
         iso2: country[1],
         dialCode: country[2]
     }));

     setCountriess(formattedCountries);
 }, []);
 const handleCountryChange = (event) => {
     const countryCode = event.target.value;
     const selected = countriess.find(country => country.iso2 === countryCode);
     setSelectedCountry(selected);
 }

 //popup form
 const [showPopup, setShowPopup] = useState(false);
 const [editMode, setEditMode] = useState(false);
 const [editIndex, setEditIndex] = useState(null);
 const [address, setAddress] = useState('');
 const [area, setArea] = useState('');
 const [street, setStreet] = useState('');
 const [office, setOffice] = useState('');
 const [pobox, setPobox] = useState('');
 const [postCode, setPostCode] = useState('');
 const [city, setCity] = useState('');
 const [airport, setAirport] = useState('');
 const [seaport, setSeaport] = useState('');
 const [isLocationChecked, setIsLocationChecked] = useState(false);
 const [isBillingChecked, setIsBillingChecked] = useState(false);
 const [isDefaultChecked, setIsDefaultChecked] = useState(false);
 const [addressList, setAddressList] = useState(JSON.parse(localStorage.getItem('seller-addresses')) || []);

 const handleAddAddress = () => {
     setShowPopup(true);
     setEditMode(false);
     setAddress('');
     setSelectedOrigin('');
     setCity('');
     setArea('');
     setStreet('');
     setOffice('');
     setPobox('');
     setPostCode('');
     setPhoneNumber('');
     setSelectedCountry('');
     setAirport('');
     setSeaport('');
     setIsLocationChecked('');
     setIsBillingChecked('');
     setIsDefaultChecked('');
 };

 const handleEditAddress = (index) => {
     const addressToEdit = addressList[index];
     setEditIndex(index);
     setAddress(addressToEdit.address);
     setSelectedOrigin(addressToEdit.selectedOrigin);
     setCity(addressToEdit.city);
     setArea(addressToEdit.area);
     setStreet(addressToEdit.street);
     setOffice(addressToEdit.office);
     setPobox(addressToEdit.pobox);
     setPostCode(addressToEdit.postCode);
     setPhoneNumber(addressToEdit.phoneNumber);
     setSelectedCountry(countriess.find((country) => country.iso2 === addressToEdit.selectedCountry.iso2));
     setAirport(addressToEdit.airport);
     setSeaport(addressToEdit.seaport);
     setIsLocationChecked(addressToEdit.isLocationChecked);
     setIsBillingChecked(addressToEdit.isBillingChecked);
     setIsDefaultChecked(addressToEdit.isDefaultChecked);
     setShowPopup(true);
     setEditMode(true);
 };

 const handleClosePopup = () => {
     setShowPopup(false);
     setEditMode(false);
     setAddress('');
     setSelectedOrigin('');
     setCity('');
     setArea('');
     setStreet('');
     setOffice('');
     setPobox('');
     setPostCode('');
     setPhoneNumber('');
     setSelectedCountry('');
     setAirport('');
     setSeaport('');
     setIsLocationChecked('');
     setIsBillingChecked('');
     setIsDefaultChecked('');
 };

 const handleSubmit = () => {
     const newAddress = {
         address,
         selectedOrigin,
         city,
         area,
         street,
         office,
         pobox,
         postCode,
         phoneNumber,
         selectedCountry,
         airport,
         seaport,
         isLocationChecked,
         isBillingChecked,
         isDefaultChecked
     };

     let updatedAddressList = [...addressList];

     if (isDefaultChecked) {
         updatedAddressList = updatedAddressList.map(addr => ({
             ...addr,
             isDefaultChecked: false
         }));
     }

     if (editMode) {
         updatedAddressList[editIndex] = newAddress;
     } else {
         updatedAddressList.push(newAddress);
     }

     setAddressList(updatedAddressList);
     localStorage.setItem('seller-addresses', JSON.stringify(updatedAddressList));

     setShowPopup(false);
     setEditMode(false);
     setAddress('');
     setSelectedOrigin('');
     setCity('');
     setArea('');
     setStreet('');
     setOffice('');
     setPobox('');
     setPostCode('');
     setPhoneNumber('');
     setSelectedCountry('');
     setAirport('');
     setSeaport('');
     setIsLocationChecked(false);
     setIsBillingChecked(false);
     setIsDefaultChecked(false);
 };

 const handleDeleteAddress = (index) => {
     const updatedAddressList = [...addressList];
     updatedAddressList.splice(index, 1);
     setAddressList(updatedAddressList);
     localStorage.setItem('seller-addresses', JSON.stringify(updatedAddressList));
 };