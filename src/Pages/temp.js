{
    this.state.timesheetVisible == true ?
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: this.props.primaryColor }}>
                <View style={{ bottom: 3, margin: 5, }}>
                    {
                        this.state.timesheetVisible == true ?
                            <Text style={styles.totalHrs}> {"Total Hours - " + this.state.TotalTime}</Text>
                            : null
                    }
                </View>
                <TouchableOpacity onPress={() => this.setState({ weekVisible: true })}
                    style={{ flexDirection: 'row', width: 200, justifyContent: 'center', alignItems: 'center', bottom: 3, borderWidth: 1, margin: 5, borderRadius: 3, borderColor: 'white' }}>
                    <Image style={{ height: 20, width: 20, marginLeft: 5, tintColor: 'white' }} source={require("../Assets/calendar.png")} />
                    <Text style={styles.text}> {firstDate1 == '' ? "Select Week" : firstDate1 + " - " + lastDate1}</Text>
                </TouchableOpacity>
            </View>

            {
                <View style={{ flexDirection: "row", top: 5 }}>
                    {
                        this.state.timesheetData.length == 0 ?
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditTimeSheet', { "header": "Timesheet Entry", "timesheetId": this.state.timesheetId, "TimeArr": this.props.time, "headerData": this.state.headerData, "timesheetData": [], "headerHrsData": [] })}
                                style={styles.saveButton}>
                                <Text style={styles.text}> {"Add Row"}</Text>
                            </TouchableOpacity>
                            : this.state.timeSheetButton == false ?
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('EditTimeSheet', { "header": "Timesheet Entry", "timesheetId": this.state.timesheetId, "TimeArr": this.props.time, "headerData": this.state.headerData, "timesheetData": [], "headerHrsData": [] })}
                                    style={styles.saveButton}>
                                    <Text style={styles.text}> {"Add Row"}</Text>
                                </TouchableOpacity>
                                : null
                    }

                    {
                        this.state.timeSheetButton == false ?
                            <>
                                <TouchableOpacity onPress={() => this.insertUpdateTimesheetEntry("Saved")}
                                    style={styles.saveButton}>
                                    <Text style={styles.text}> {"Save"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.submitTimesheetEntry("Submitted")}
                                    style={styles.saveButton}>
                                    <Text style={styles.text}> {"Submit"}</Text>
                                </TouchableOpacity>
                            </> : null
                    }
                </View>
                // : null
            }

        </> : null
}

<ScrollView style={{ flex: 1 }}
    scrollEnabled={this.state.content}
>
    <View style={{ width: '100%' }}>
        {
            this.state.timesheetData.length !== 0 ?
                <View style={{ flexDirection: 'row', marginLeft: 5, }}>
                    <View style={{ flexDirection: 'column', }}>
                    <View style={{  height: 75,  backgroundColor: 'transparent' }}>
                        <View style={[styles.sheetHeader, { justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.stripHeaderColor }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 18, fontWeight: '900', color: this.props.fontColor }}>{"Project"}</Text>
                                <Text style={{ fontSize: 16, color: this.props.fontColor }}>{"  (Client)"}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 16, color: this.props.fontColor }}>{"Description"}</Text>
                            </View>
                            </View>
                        </View>
                        {
                            this.state.timesheetData.length !== 0 ?
                                <View style={{ flexDirection: 'row', }}>
                                    <FlatList
                                        data={Object.keys(this.state.timesheetData)}
                                        renderItem={({ item }) => (
                                            <View  style={[styles.sheetData1, { backgroundColor: this.props.stripColor , flexDirection:'row'}]}>
                                                {
                                                    this.state.timesheetData[item].ApproverAction == "Rejected" ?
                                                        <View style={[styles.rejected, { backgroundColor: "red" }]} /> : null
                                                }
                                                <TouchableOpacity 
                                                    onPress={() => this.props.navigation.navigate('ProjectDetail', { "timesheetData": this.state.timesheetData[item], "headerData": this.state.headerData, "headerHrsData": this.state.headerHrsData, "Status": this.state.timesheetData[item].Status == "Saved" ? true : false })}
                                                   >
                                                    <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '900', }}>{this.state.timesheetData[item].ProjectName}</Text>
                                                    <Text numberOfLines={1} style={{ color: "#4D504F" }}>{"(" + this.state.timesheetData[item].ClientName + ")"}</Text>
                                                    <Text numberOfLines={1} style={{ color: "#4D504F" }}>{this.state.timesheetData[item].TaskDesc}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    />
                                </View> : null
                        }
                    </View>

                    <ScrollView style={{ marginBottom: 40 }}
                        horizontal={true}
                        scrollEnabled={this.state.content}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ flexDirection: 'column',marginRight: 5, }}>
                            <View style={{ flexDirection: 'row', height: 75,top:5, backgroundColor: this.props.stripHeaderColor }}>
                                <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor }]}>
                                    <Text style={{ color: this.props.fontColor }}>{this.state.lblMon}</Text>
                                    <Text style={{ color: this.props.fontColor }}>{this.state.dvTotMon}</Text>
                                </View>
                                <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor }]}>
                                    <Text style={{ color: this.props.fontColor }}>{this.state.lblTue}</Text>
                                    <Text style={{ color: this.props.fontColor }}>{this.state.dvTotTue}</Text>
                                </View>

                                <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor, }]}>
                                    <Text style={{ color: this.props.fontColor }}>{this.state.lblWed}</Text>
                                    <Text style={{ color: this.props.fontColor }}>{this.state.dvTotWed}</Text>
                                </View>
                                <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor, }]}>
                                    <Text style={{ color: this.props.fontColor }}>{this.state.lblThu}</Text>
                                    <Text style={{ color: this.props.fontColor }}>{this.state.dvTotThu}</Text>
                                </View>
                                <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor }]}>
                                    <Text style={{ color: this.props.fontColor }}>{this.state.lblFri}</Text>
                                    <Text style={{ color: this.props.fontColor }}>{this.state.dvTotFri}</Text>
                                </View>
                                <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor }]}>
                                    <Text style={{ color: this.props.fontColor }}>{this.state.lblSat}</Text>
                                    <Text style={{ color: this.props.fontColor }}>{this.state.dvTotSat}</Text>
                                </View>
                                <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor }]}>
                                    <Text style={{ color: this.props.fontColor }}>{this.state.lblSun}</Text>
                                    <Text style={{ color: this.props.fontColor }}>{this.state.dvTotSun}</Text>
                                </View>
                                <View style={[styles.OTP, { backgroundColor: this.props.stripHeaderColor }]}>
                                    <Text style={{ color: this.props.fontColor }}>{"APPROVER"}</Text>
                                    {/* <Text style={{ color: this.props.fontColor }}>{this.state.dvTotFri}</Text> */}
                                </View>
                                <View style={[styles.OTP, { backgroundColor: this.props.stripHeaderColor }]}>
                                    <Text style={{ color: this.props.fontColor }}>{"ON TIME"}</Text>
                                    <Text style={{ color: this.props.fontColor }}>{"PERFORMANCE"}</Text>
                                </View>
                                <View style={[styles.approver, { backgroundColor: this.props.stripHeaderColor }]}>
                                    <Text style={{ color: this.props.fontColor }}>{"QUALITY  OF"}</Text>
                                    <Text style={{ color: this.props.fontColor }}>{"WORK"}</Text>
                                </View>

                            </View>
                            <FlatList
                                data={Object.keys(this.state.timesheetData)}
                                renderItem={({ item, index }) => (
                                    <View style={{ flexDirection: 'row', }}>

                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.timesheetData[item].Status == "Saved" ? true : false, dayField: 'Mon', dayIndex: index, dayField: 1, }) }}
                                                style={[styles.hrsData,{backgroundColor: this.state.timesheetData[item].Status == "Saved"? '#FFFF': "#E9ECEF"}]}>
                                                <Text>{this.state.timesheetData[item].Mon}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ addDescVisible: true, descEdit: this.state.timesheetData[item].Status == "Saved" ? true : false, addDesc: this.state.timesheetData[item].Mon_TaskComments, addDescField: 1, addDescIndex: index },
                                                    () => { })}>
                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.timesheetData[item].Status == "Saved" ? true : false, dayField: 'Tue', dayIndex: index, dayField: 2, }) }} 
                                                style={[styles.hrsData,{backgroundColor: this.state.timesheetData[item].Status == "Saved"? '#FFFF': "#E9ECEF"}]}>
                                                <Text>{this.state.timesheetData[item].Tue}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ addDescVisible: true, descEdit: this.state.timesheetData[item].Status == "Saved" ? true : false, addDesc: this.state.timesheetData[item].Tue_TaskComments, addDescField: 2, addDescIndex: index },
                                                    () => { })}>
                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.timesheetData[item].Status == "Saved" ? true : false, dayField: 'Wed', dayIndex: index, dayField: 3, }) }} 
                                                style={[styles.hrsData,{backgroundColor: this.state.timesheetData[item].Status == "Saved"? '#FFFF': "#E9ECEF"}]}>
                                                <Text>{this.state.timesheetData[item].Wed}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ addDescVisible: true, descEdit: this.state.timesheetData[item].Status == "Saved" ? true : false, addDesc: this.state.timesheetData[item].Wed_TaskComments, addDescField: 3, addDescIndex: index },
                                                    () => { })}>
                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.timesheetData[item].Status == "Saved" ? true : false, dayField: 'Thu', dayIndex: index, dayField: 4, }) }} 
                                                style={[styles.hrsData,{backgroundColor: this.state.timesheetData[item].Status == "Saved"? '#FFFF': "#E9ECEF"}]}>
                                                <Text>{this.state.timesheetData[item].Thu}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ addDescVisible: true, descEdit: this.state.timesheetData[item].Status == "Saved" ? true : false, addDesc: this.state.timesheetData[item].Thu_TaskComments, addDescField: 4, addDescIndex: index },
                                                    () => { })}>
                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.timesheetData[item].Status == "Saved" ? true : false, dayField: 'Fri', dayIndex: index, dayField: 5, }) }}
                                                style={[styles.hrsData,{backgroundColor: this.state.timesheetData[item].Status == "Saved"? '#FFFF': "#E9ECEF"}]}>
                                                <Text>{this.state.timesheetData[item].Fri}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ addDescVisible: true, descEdit: this.state.timesheetData[item].Status == "Saved" ? true : false, addDesc: this.state.timesheetData[item].Fri_TaskComments, addDescField: 5, addDescIndex: index },
                                                    () => { })}>
                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.timesheetData[item].Status == "Saved" ? true : false, dayField: 'Sat', dayIndex: index, dayField: 6, }) }}
                                                style={[styles.hrsData,{backgroundColor: this.state.timesheetData[item].Status == "Saved"? '#FFFF': "#E9ECEF"}]}>
                                                <Text>{this.state.timesheetData[item].Sat}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ addDescVisible: true, descEdit: this.state.timesheetData[item].Status == "Saved" ? true : false, addDesc: this.state.timesheetData[item].Sat_TaskComments, addDescField: 6, addDescIndex: index },
                                                    () => { })}>
                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.timesheetData[item].Status == "Saved" ? true : false, dayField: 'Sun', dayIndex: index, dayField: 7, }) }} 
                                                style={[styles.hrsData,{backgroundColor: this.state.timesheetData[item].Status == "Saved"? '#FFFF': "#E9ECEF"}]}>
                                                <Text>{this.state.timesheetData[item].Sun}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ addDescVisible: true, descEdit: this.state.timesheetData[item].Status == "Saved" ? true : false, addDesc: this.state.timesheetData[item].Sun_TaskComments, addDescField: 7, addDescIndex: index },
                                                    () => { })}>
                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.OTP, { backgroundColor: this.props.stripColor }]}>
                                            <Text>{this.state.timesheetData[item].Approver}</Text>
                                        </View>
                                        <View style={[styles.OTP, { backgroundColor: this.props.stripColor }]}>
                                            <Text>{this.state.timesheetData[item].ApprOTPRating}</Text>
                                        </View>
                                        <View style={[styles.approver, { backgroundColor: this.props.stripColor }]}>
                                            <Text>{this.state.timesheetData[item].ApprQOWRating}</Text>
                                        </View>
                                    </View>
                                )}
                            />

                        </View>

                    </ScrollView>
                </View> : null
        }

        <Dialog
            visible={this.state.addDescVisible}
            style={{ backgroundColor: 'white', height: 250, width: 350 }}
            onTouchOutside={() => this.setState({ addDescVisible: false }, () => { this.handleAddDescription() })}

        >
            <View style={{ backgroundColor: '#FFFF', height: 250, width: 350, bottom: 25, right: 25, }}>
                <View style={{ height: 50, padding: 15, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                    <Text style={{ fontSize: title, color: this.props.fontColor }}>{'Additional Description'}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center',  }}>
                    <View style={{ borderRadius: 5, borderWidth: .5, width: 300, height: 170, margin:15, backgroundColor: this.state.descEdit == true? "white": "#E9ECEF" }}>
                        {this.state.descEdit == true ?
                            <TextInput
                                multiline={true}
                                value={this.state.addDesc}
                                onChangeText={value => this.setState({ addDesc: value })}
                            /> : null
                        }
                    </View>
                </View>
            </View>
        </Dialog>

        <Dialog
            visible={this.state.timeVisible}
            onTouchOutside={() =>
                this.setState({ timeVisible: false }, () => { this.updateTime() })}
            style={
                {
                    width: 100,
                    height: 350,
                }
            }
        >
            <View style={{ justifyContent: 'center', alignItems: 'center', right: 20 }}>

                <FlatList
                    data={Object.keys(this.props.time)}
                    renderItem={({ item, index }) => (

                        <TouchableOpacity onPress={() => {
                            this.setState({ selectedTime: this.props.time[item], timeVisible: false },
                                () => {
                                    this.updateTime()

                                })
                        }}
                            style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}>
                            <View>
                                <Text style={styles.textPopup}>
                                    {this.props.time[item]}
                                </Text>
                                <Divider />
                            </View>
                        </TouchableOpacity>)}
                />

            </View>
        </Dialog>

        <Dialog
            visible={this.state.weekVisible}
            style={{ backgroundColor: 'white', width: 250 }}
            onTouchOutside={() => this.setState({ weekVisible: false }, () => { })}

        >
            <View style={{ backgroundColor: 'white', width: 250, height: 300, bottom: 25, right: 25 }}>
                <View style={{ height: 50, padding: 15, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                    <Text style={{ fontSize: title, color: this.props.fontColor }}>{'Select Week'}</Text>
                </View>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', top: 15 }}>
                    <View style={{ borderRadius: 5, width: 250, }}>
                        {
                            this.state.timesheetList.length == 0 ?
                                <View style={{ width: '100%', }}>
                                    <Text style={styles.textPopup}>
                                        {"No Data Available"}
                                    </Text>
                                    <Divider />
                                </View>
                                :
                                <FlatList
                                    data={Object.keys(this.state.timesheetList)}
                                    renderItem={({ item, index }) => (

                                        <TouchableOpacity onPress={() => {
                                            this.setState({ selectedWeek: this.state.timesheetList[item], timesheetId: this.state.timesheetList[item].Value, weekVisible: false, timesheetVisible: true },
                                                () => {
                                                    this.props.ts_Id(this.state.timesheetList[item].Value)
                                                    firstDate1 = moment(new Date(this.state.selectedWeek.Text.slice(0, 10).split('-').reverse().join('/'))).format("DD MMM"),
                                                        lastDate1 = moment(new Date(this.state.selectedWeek.Text.slice(14, 24).split('-').reverse().join('/'))).format("DD MMM YYYY"),
                                                        this.empWeeklyTimesheetData()
                                                })
                                        }}
                                            style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}>
                                            <View style={{ width: '100%', }}>

                                                {
                                                    firstDate = moment(new Date(this.state.timesheetList[item].Text.slice(0, 10).split('-').reverse().join('/'))).format("DD MMM"),
                                                    lastDate = moment(new Date(this.state.timesheetList[item].Text.slice(14, 24).split('-').reverse().join('/'))).format("DD MMM YYYY"),
                                                    console.log(" ")
                                                }
                                                <Text style={styles.textPopup}>

                                                    {firstDate.toUpperCase() + " - " + lastDate.toUpperCase()}
                                                </Text>
                                                <Divider />
                                            </View>
                                        </TouchableOpacity>)}
                                />
                        }
                    </View>
                </View>
            </View>
        </Dialog>

        <View style={{ flex: 1 }}>
            <SheetBottom
                visible={this.state.calenderVisible}
                style={{ backgroundColor: this.props.primaryColor }}
                onBackdropPress={() => this.setState({ calenderVisible: false })}
                onSwipeDown={() => this.setState({ calenderVisible: false })}>
                <CalendarPicker
                    onDateChange={this.onDateChange}
                    startFromMonday={true}
                    maxDate={new Date()}
                    width={350}
                    height={400}
                    textStyle={{ fontSize: 16, color: 'white' }}
                    todayBackgroundColor={'tomato'}
                />
            </SheetBottom>
        </View>
    </View>
</ScrollView>

<FloatingAction
    actions={actions}
    animated={true}
    position={"right"}
    color={this.props.primaryColor}
    onPressItem={position => {
        position == 'Select Week' ?
            this.setState({ weekVisible: true }) :
            this.setState({ calenderVisible: true })
    }}
/>
