// import React, { Component } from 'react';
// import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
// export default class HeaderMultipleIconExample extends Component {
//   render() {
//     return (
//       <Container>
//         <Header>
//           <Left>
//             <Button transparent>
//               <Icon name='arrow-back' 
//               onPress={() =>
//                 this.props.title == "Timesheet Entry"? this.props.navigation.navigate('TimeSheet',{"Loading": false}):
//                 this.props.title == "Edit Timesheet Entry"? this.props.navigation.navigate('TimeSheet'):
//                 this.props.title == "Project Details"? this.state.backNavigation=="TsApproval"? this.props.navigation.navigate('TsApproval',{"Loading": false}): this.props.navigation.navigate('TimeSheet',{"Loading": false}): 
//                 null
//               }
//               />
//             </Button>
//           </Left>
//           <Body>
//             <Title>{this.props.title}</Title>
//           </Body>
//           <Right>
//           {
//               this.props.timeSheetEntry == true ?
//             <Button transparent>
//               <Icon name='save' 
//               onPress={() => { this.props.handleSave() }}
//               />
//             </Button>: null
//             }
//             {
//               this.props.details == true ?
//             <Button transparent>
//               <Icon name='heart'
//                onPress={() => { this.props.handleEditRecord() }}
//               />
//             </Button> : null
//             }
//             {
//               this.props.details == true ?
//             <Button transparent>
//               <Icon name='more'
//                onPress={() => { this.props.handleDeleteRecord() }}
//               />
//             </Button>: null
//             }
//           </Right>
//         </Header>
//       </Container>
//     );
//   }
// }


// <View style={styles.horizontalContainer}>
//                             <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.projectGroup == '' ? 'red' : "transparent" }]}>
//                                 <TouchableOpacity onPress={() => this.setState({ title: "Project Group", data: this.state.projectGrpList, fieldVisible: true, field: 0, })}
//                                     style={styles.cardMenuSpasing}>
//                                     <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>PROJECT GROUP</Text>
//                                     <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F" }]}>{this.state.projectGroup == '' ? "--select--" : this.state.projectGroupName}</Text>
//                                 </TouchableOpacity>
//                             </Card>
//                             <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.client == '' ? 'red' : "transparent" }]}>
//                                 <TouchableOpacity onPress={() => this.setState({ title: "Client List", fieldVisible: true, field: 1, data: this.state.clientList })}
//                                     style={styles.cardMenuSpasing}>
//                                     <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>CLIENT</Text>
//                                     <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F", }]}>{this.state.client == '' ? "--select--" : this.state.clientName}</Text>
//                                 </TouchableOpacity>
//                             </Card>
//                         </View>

//                         <View style={styles.horizontalContainer}>
//                             <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.project == '' ? 'red' : "transparent" }]}>
//                                 <TouchableOpacity onPress={() => this.setState({ title: "Project List", data: this.state.projetList, fieldVisible: true, field: 2, })}
//                                     style={styles.cardMenuSpasing}>
//                                     <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>PROJECT</Text>
//                                     <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F" }]}>{this.state.projectName == '' ? "--select--" : this.state.projectName}</Text>
//                                 </TouchableOpacity>
//                             </Card>

//                             <Card style={[styles.cards, {}]}>
//                                 <TouchableOpacity onPress={() => this.setState({ title: "Type Of Work", fieldVisible: true, field: 3, data: this.state.typeOfWorkList })}
//                                     style={styles.cardMenuSpasing}>
//                                     <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>TYPE OF WORK</Text>
//                                     <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F" }]}>{this.state.typeOfWork == '' ? "--select--" : this.state.typeOfWork}</Text>
//                                 </TouchableOpacity>
//                             </Card>


//                         </View>
//                         <View style={styles.horizontalContainer}>
//                             <Card style={styles.cards}>
//                                 <TouchableOpacity onPress={() => this.setState({ title: "Phase", fieldVisible: true, field: 4, data: this.state.phaseList })}
//                                     style={styles.cardMenuSpasing}>
//                                     <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>PHASE</Text>
//                                     <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F" }]}>{this.state.phaseName == '' || this.state.phaseName == null ? "--select--" : this.state.phaseName}</Text>
//                                 </TouchableOpacity>
//                             </Card>
//                             <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.activity == 0 ? 'red' : "transparent" }]}>
//                                 <TouchableOpacity onPress={() => this.setState({ title: "Activity", fieldVisible: true, field: 5, data: this.state.activityList })}
//                                     style={styles.cardMenuSpasing}>
//                                     <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>ACTIVITY</Text>
//                                     <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F" }]}>{this.state.activityName == '' ? "--select--" : this.state.activityName}</Text>
//                                 </TouchableOpacity>
//                             </Card>
//                         </View>
//                         <Card style={[styles.descCard, { borderWidth: 1, borderColor: this.state.validation == true && this.state.projectDesc == "" ? 'red' : "transparent" }]}>
//                             <View style={styles.reasonView}>
//                                 <Text style={[styles.twoCardLabel, { color: this.props.primaryColor }]}>DESCRIPTION</Text>
//                                 <TextInput
//                                     mode="flat"
//                                     underlineColor="white"
//                                     multiline
//                                     placeholder="Enter Description"
//                                     textAlignVertical="top"
//                                     underlineColorAndroid="white"
//                                     keyboardType="default"
//                                     autoFocus={false}
//                                     // maxLength={500}
//                                     dense
//                                     selectionColor={this.props.primaryColor}
//                                     value={this.state.projectDesc}
//                                     onChangeText={desc => this.setState({ projectDesc: desc, })}
//                                     numberOfLines={5}
//                                     style={styles.longText}
//                                 />
//                             </View>
//                         </Card>
//                         <Card style={styles.descCard}>
//                             <ScrollView horizontal={true}
//                                 showsHorizontalScrollIndicator={false}>
//                                 <View style={styles.timeView}>
//                                     <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
//                                         <Text style={{ color: this.props.primaryColor }}>{this.state.lblMon1}</Text>
//                                         <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotMon1}</Text>
//                                         <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayField: 'Mon', dayValue: 1, }) }} style={styles.hrsData}>
//                                             <Text>{this.state.lblMon}</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity onPress={() =>
//                                             this.setState({ addDescVisible: true, addDescField: 1, addDesc: this.state.descMon })}>
//                                             <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
//                                         </TouchableOpacity>
//                                     </View>
//                                     <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
//                                         <Text style={{ color: this.props.primaryColor }}>{this.state.lblTue1}</Text>
//                                         <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotTue1}</Text>
//                                         <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayValue: 2, }) }} style={styles.hrsData}>
//                                             <Text>{this.state.lblTue}</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity onPress={() =>
//                                             this.setState({ addDescVisible: true, addDescField: 2, addDesc: this.state.descTue })}>
//                                             <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
//                                         </TouchableOpacity>
//                                     </View>
//                                     <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
//                                         <Text style={{ color: this.props.primaryColor }}>{this.state.lblWed1}</Text>
//                                         <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotWed1}</Text>
//                                         <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayValue: 3, }) }} style={styles.hrsData}>
//                                             <Text>{this.state.lblWed}</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity onPress={() =>
//                                             this.setState({ addDescVisible: true, addDescField: 3, addDesc: this.state.descWed })}>
//                                             <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
//                                         </TouchableOpacity>
//                                     </View>
//                                     <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
//                                         <Text style={{ color: this.props.primaryColor }}>{this.state.lblThu1}</Text>
//                                         <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotThu1}</Text>
//                                         <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayValue: 4, }) }} style={styles.hrsData}>
//                                             <Text>{this.state.lblThu}</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity onPress={() =>
//                                             this.setState({ addDescVisible: true, addDescField: 4, addDesc: this.state.descThu })}>
//                                             <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
//                                         </TouchableOpacity>
//                                     </View>
//                                     <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
//                                         <Text style={{ color: this.props.primaryColor }}>{this.state.lblFri1}</Text>
//                                         <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotFri1}</Text>
//                                         <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayValue: 5, }) }} style={styles.hrsData}>
//                                             <Text>{this.state.lblFri}</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity onPress={() =>
//                                             this.setState({ addDescVisible: true, addDescField: 5, addDesc: this.state.descFri })}>
//                                             <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
//                                         </TouchableOpacity>
//                                     </View>
//                                     <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
//                                         <Text style={{ color: this.props.primaryColor }}>{this.state.lblSat1}</Text>
//                                         <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotSat1}</Text>
//                                         <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayValue: 6, }) }} style={styles.hrsData}>
//                                             <Text>{this.state.lblSat}</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity onPress={() =>
//                                             this.setState({ addDescVisible: true, addDescField: 6, addDesc: this.state.descSat })}>
//                                             <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
//                                         </TouchableOpacity>
//                                     </View>
//                                     <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
//                                         <Text style={{ color: this.props.primaryColor }}>{this.state.lblSun1}</Text>
//                                         <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotSun1}</Text>
//                                         <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayValue: 7, }) }} style={styles.hrsData}>
//                                             <Text>{this.state.lblSun}</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity onPress={() =>
//                                             this.setState({ addDescVisible: true, addDescField: 7, addDesc: this.state.descSun })}>
//                                             <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
//                                         </TouchableOpacity>
//                                     </View>
//                                 </View>
//                             </ScrollView>
//                         </Card>

//                         <Modal isVisible={this.state.fieldVisible}>
//                             <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                                 <View style={{ backgroundColor: 'white', borderRadius: 5, width: 350, height: 250 }}>
//                                     <View style={{ borderTopStartRadius: 5, borderTopEndRadius: 5, height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
//                                         <Text style={{ fontSize: title, color: this.props.fontColor }}>{this.state.title}</Text>
//                                         <TouchableOpacity onPress={() =>
//                                             this.setState({ fieldVisible: false, },
//                                                 () => { })}>
//                                             <Image style={{ height: 30, width: 30, tintColor: 'white' }} source={require('../Assets/redCross.png')} />
//                                         </TouchableOpacity>
//                                     </View>
//                                     <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', top: 5 }}>
//                                         <View style={{ borderRadius: 5, height: 200 }}>
//                                             {
//                                                 this.state.data.length == 0 ?
//                                                     <View style={{ width: '100%', }}>
//                                                         <Text style={styles.textPopup}>
//                                                             {"No Data Available"}
//                                                         </Text>
//                                                         <Divider />
//                                                     </View>
//                                                     :
//                                                     <FlatList
//                                                         data={Object.keys(this.state.data)}
//                                                         renderItem={({ item, index }) => (

//                                                             <TouchableOpacity onPress={() => {
//                                                                 this.handleSelectedData(this.state.data[item], index)
//                                                             }}
//                                                                 style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}>
//                                                                 <View style={{ width: '100%', }}>
//                                                                     <Text style={styles.textPopup}>
//                                                                         {this.state.data[item].Text}
//                                                                     </Text>
//                                                                     <Divider />
//                                                                 </View>
//                                                             </TouchableOpacity>)}
//                                                     />
//                                             }
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View>
//                         </Modal>


//                         <Modal isVisible={this.state.addDescVisible}>
//                             <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                                 <View style={{ backgroundColor: 'white', borderRadius: 5, width: 350, height: 250 }}>
//                                     <View style={{ borderTopStartRadius: 5, borderTopEndRadius: 5, height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
//                                         <Text style={{ fontSize: title, color: this.props.fontColor }}>{'Additional Description'}</Text>
//                                         <TouchableOpacity onPress={() =>
//                                             this.setState({ addDescVisible: false, },
//                                                 () => { this.handleDescription() })}>
//                                             <Image style={{ height: 30, width: 30, tintColor: 'white' }} source={require('../Assets/redCross.png')} />
//                                         </TouchableOpacity>
//                                     </View>
//                                     <View style={{ justifyContent: 'center', alignItems: 'center', }}>
//                                         <View style={{ borderRadius: 5, borderWidth: .5, width: 300, height: 170, margin: 15 }}>
//                                             <TextInput
//                                                 multiline={true}
//                                                 value={this.state.addDesc}
//                                                 placeholder="Enter Description"
//                                                 textAlignVertical="top"
//                                                 underlineColor="white"
//                                                 keyboardType="default"
//                                                 autoFocus={false}
//                                                 dense
//                                                 onChangeText={value => this.setState({ addDesc: value, description: value })}
//                                             />
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View>
//                         </Modal>



//                         <Dialog
//                             visible={this.state.timeVisible}
//                             onTouchOutside={() =>
//                                 this.setState({ timeVisible: false }, () => { })}
//                             style={
//                                 {
//                                     width: 100,
//                                     height: 350,
//                                 }
//                             }
//                         >
//                             <View style={{ justifyContent: 'center', alignItems: 'center', right: 20 }}>

//                                 <FlatList
//                                     data={Object.keys(this.state.pickerTime)}
//                                     renderItem={({ item, index }) => (

//                                         <TouchableOpacity onPress={() => {
//                                             this.setState({ timeVisible: false }, () => { this.updateTime(this.state.pickerTime[item]) })
//                                         }}
//                                             style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}>
//                                             <View>
//                                                 <Text style={styles.textPopup}>
//                                                     {this.state.pickerTime[item]}
//                                                 </Text>
//                                                 <Divider />
//                                             </View>
//                                         </TouchableOpacity>)}
//                                 />
//                             </View>
//                         </Dialog>