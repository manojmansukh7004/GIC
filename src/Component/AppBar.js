import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Title, } from 'react-native-paper';
import ProfileAvtar from '../Pages/ProfileAvtar'
import { FetchFiltetData } from '../Services/SalesRC&VEG/FetchFiltetData'
import { FetchLeadershipFilterData } from '../Services/Leadership/FetchLeadershipFilterData'
import { FetchProcessingFilter } from '../Services/Processing/FetchProcessingFilter'
import { FetchProductionFilter } from '../Services/Production/FetchProductionFilter'
import { FetchProdLeadershipFilter } from '../Services/ProdLeadership/FetchProdLeadershipFilter'

import { connect } from 'react-redux'
import moment from 'moment'
import {
    setCompany, setCountry, setDivision, setSeason, setZone, setRegion, setPlc,
    setCrop, setCropType, setCustomer, setProduct, setRbm, setTbm, setterritory,setPlant
} from '../Redux/Action'
import { setFilterData, setVegFilterData, setLeadershipData, setProcessFilter, setProductionData, setProdLeadershipData } from '../Redux/Action'
var start
class AppBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bgColor: '',
      visible: false,
      dialogVisible: false,
      type: 'RB',
      division0: "'02','03'",
      type1: 'VB',
      division1: "01",
      filterData: '',
      vegFilterData: '',
      leadershipData: '',
      processData: '',
      productionData:'',
      prodLeadershipData:'',
      filterVisible: false,
      dashboardNo:'',
      country: '',
      company: '',
      division: '',
      season:'',
      zone: '',
      region: '',
      territory: '',
      rbm: '',
      tbm:'',
      customer: '',
      plc: '',
      cropType: '',
      crop: '',
      product: '',
      plant:''
    }
  }

  toggleDrawer() {
    this.props.navigation.toggleDrawer()
  };
  
  componentWillUnmount() {
console.log('willlllllllllllllllllllllll');

    // this.props.setCountry(this.state.country)
    // this.props.setCompany(this.state.company)
    // this.props.setDivision(this.state.division)
    // this.props.setSeason(this.state.season)
    // this.props.setZone(this.state.zone)
    // this.props.setRegion(this.state.region)
    // this.props.setRbm(this.state.rbm)
    // this.props.setCustomer(this.state.customer)
    // this.props.setterritory(this.state.territory)
    // this.props.setTbm(this.state.tbm)
    // this.props.setPlc(this.state.plc)
    // this.props.setCrop(this.state.crop)
    // this.props.setCropType(this.state.cropType)
    // this.props.setProduct(this.state.product)
    // this.props.setPlant(this.state.plant)

  }

  async componentDidMount() {
    console.log("this.props.title",this.props.title, start = moment().format('mm:ss'));

    if (this.props.title == "Sales RC BU Team") {      
      const response = await FetchFiltetData(this.props.userId, this.state.type, this.state.division0, this.props.baseUrl);
      this.props.setFilterData(response)
      this.setState({
        filterData: ''
      }, () => {
        this.setState({ filterData: this.props.filterData, dashboardNo:1 })
      })
    }
    
    else if (this.props.title == "Sales VEG BU Team") {
      const response1 = await FetchFiltetData(this.props.userId, this.state.type1, this.state.division1, this.props.baseUrl);
      this.props.setVegFilterData(response1)
      this.setState({
        filterData: '',
      }, () => {
        this.setState({ filterData: this.props.vegFilterData, dashboardNo:2 })
      })
    }

    else if (this.props.title == "Sales Leadership") {
      var Action = 1
      const response1 = await FetchLeadershipFilterData(Action, this.props.userId, this.props.baseUrl);     
      this.props.setLeadershipData(response1)

      this.setState({
        filterData: '',
      }, () => {
        this.setState({ filterData: this.props.leadershipData,dashboardNo:3 },()=>{
        })
      })
    }

    else if (this.props.title == "Processing Team") {
      var Action = 1
      const response1 = await FetchProcessingFilter(Action, this.props.userId, this.props.baseUrl);
      this.props.setProcessFilter(response1)
      this.setState({
        filterData: '',
      }, () => {
        this.setState({ filterData: this.props.processFilterData ,dashboardNo:4})
      })
    }

    else if (this.props.title == "Production") {
      var Action = 1
      const response1 = await FetchProductionFilter(Action, this.props.userId, this.props.baseUrl);
      this.props.setProductionData(response1)
      this.setState({
        filterData: '',
      }, () => {
        this.setState({ filterData: this.props.prductionFilterData ,dashboardNo:5},()=>{console.log("filter",this.state.filterData);
        })
      })
    }

    else if (this.props.title == "Production Leadership") {
      var Action = 1
      const response1 = await FetchProdLeadershipFilter(Action, this.props.userId, this.props.baseUrl);
      this.props.setProdLeadershipData(response1)
      console.log("prodLeaderrrrrr",this.props.prodLeadershipFilterData);
      this.setState({
        filterData: '',
      }, () => {
        this.setState({ filterData: this.props.prodLeadershipFilterData ,dashboardNo:6},()=>{console.log("prodLeadrerfilter",this.state.filterData);
        })
      })
    }
  }
  

  render() {

    return (
      <View style={styles.subContiner1}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', }}>
          <TouchableOpacity onPress={() => this.toggleDrawer()}>
            <Image
              source={require('../Assets/drawer.png')}
              style={{ width: 33, height: 33, margin: 5, }}
            />
          </TouchableOpacity>
          <Title style={styles.Title}>
            {this.props.title}
          </Title>
          <View style={{ flexDirection: 'row', marginRight: 3 }}>
            {
              this.state.filterData !== '' ?
                <TouchableOpacity
                  onPress={() =>
                    this.props.title == "Processing Team" ? this.props.navigation.navigate('ProcessFilter', { "FilterData": this.state.filterData, "prevPage": this.props.title })
                    :this.props.title == 'Production'?this.props.navigation.navigate('ProductionFilter', { "FilterData": this.state.filterData, "prevPage": this.props.title })
                    :this.props.title ==  "Production Leadership"?this.props.navigation.navigate('ProdLeadershipFilter', { "FilterData": this.state.filterData, "prevPage": this.props.title })
                    : this.props.navigation.navigate('MainFilter', { "FilterData": this.state.filterData, "prevPage": this.props.title , "dasboardNo": this.state.dashboardNo, "uom":this.props.uom})}
                >
                  <Image source={require('../Assets/filter.png')}
                    style={{ top: 0, width: 35, height: 35, margin: 5, tintColor: 'black' }} />
                </TouchableOpacity>
                :
                <Image source={require('../Assets/filter1.gif')}
                  style={{ top: 0, width: 35, height: 35, margin: 5, borderColor: ' black' }} />

            }
            <View style={{ margin: 3, top: 0, marginRight: 7 }}>
              <ProfileAvtar {...this.props} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setFilterData: (response) => dispatch(setFilterData(response)),
    setVegFilterData: (response1) => dispatch(setVegFilterData(response1)),
    setLeadershipData: (response1) => dispatch(setLeadershipData(response1)),
    setProcessFilter: (response1) => dispatch(setProcessFilter(response1)),
    setProductionData: (response1) => dispatch(setProductionData(response1)),
    setProdLeadershipData: (response1) => dispatch(setProdLeadershipData(response1)),

    
    // setCountry: (country) => dispatch(setCountry(country)),
    // setCompany: (company) => dispatch(setCompany(company)),
    // setDivision: (division) => dispatch(setDivision(division)),
    // setSeason: (season) => dispatch(setSeason(season)),
    // setZone: (zone) => dispatch(setZone(zone)),
    // setRegion: (region) => dispatch(setRegion(region)),
    // setRbm: (rbm) => dispatch(setRbm(rbm)),
    // setterritory: (territory) => dispatch(setterritory(territory)),
    // setTbm: (tbm) => dispatch(setTbm(tbm)),
    // setCustomer: (customer) => dispatch(setCustomer(customer)),
    // setPlc: (plc) => dispatch(setPlc(plc)),
    // setCropType: (cropType) => dispatch(setCropType(cropType)),
    // setCrop: (crop) => dispatch(setCrop(crop)),
    // setProduct: (product) => dispatch(setProduct(product)),
    // setPlant: (plant) => dispatch(setPlant(plant)),

  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    baseUrl: state.baseUrl,
    filterData: state.filterData,
    vegFilterData: state.vegFilterData,
    leadershipData: state.leadershipData,
    processFilterData: state.processFilterData,
    prductionFilterData: state.prductionFilterData,
    prodLeadershipFilterData: state.prodLeadershipFilterData,
    uom: state.uom
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppBar)

const styles = StyleSheet.create({
  Container: {

    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: "white"

  },
  Title: {
    fontSize: 19,
    margin: 5,
    justifyContent: 'center'
  },
  subContiner1: {
    flexDirection: 'row',
    height: 45,
    borderWidth: 0.3,
    borderColor: 'grey',
    borderRadius: 5,
    margin: 5,
    top: 3,
  },


});