import * as React from "react"

import {View, Text, TouchableOpacity, FlatList} from "react-native"
import {Header, SearchBar} from "react-native-elements"
import db from "../config"
export default class ReadScreen extends React.Component{

    constructor(){
        super()
        this.state={
            search:"", 
            allQuotes:[],
            dataSource:[]
        }
    }

    componentDidMount(){
        this.retriveQuotes()
    }

    updateSearch = search => {
        this.setState({ search });
      };

      
  
    retriveQuotes=()=>{
        try{
            var allQuotes=[]
            var q = db.collection("quotes").get()
            .then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    allQuotes.push(doc.data())
                })
                this.setState({allQuotes})
            })

        }
        catch(error){
            console.log(error)
        }
    }

    SearchFilterFunction=(text)=>{
        const newData = this.state.allQuotes.filter((item)=>{
            const itemData = item.writer ? item.writer.toUpperCase() : "".toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: newData,
            search: text
        })
    }

    
    
    render(){
        return(
            <View>

                <Header/>
                <SearchBar placeholder="Type Here to Search.." 
                onChangeText={text=>this.SearchFilterFunction(text)}
                onClear={text=>this.SearchFilterFunction("")} 
                value={this.state.search}
                />

                <View>
                    <FlatList 
                    data={this.state.search==="" ? this.state.allQuotes : this.state.dataSource}
                    renderItem={({item})=>(
                        <View>
                            <Text> Quote {item.quote}</Text>
                            <Text> Writer {item.writer}</Text>
                        </View>
                    )}
                   keyExtractor={(item, index) => index.toString()} />
                </View>
            </View>
        )
    }
}