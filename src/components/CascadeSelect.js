/**
 * Created by houdong on 2017/10/30.
 */
import React,{ Component} from 'react';
import PropTypes from 'prop-types';
import '../css/CacadeSelect.css';

export default class CascadeSelect extends Component{
    constructor(props){
        super(props);
        this.state={
            secondOptions:[],
            thirdOptions:[],
            hideAll:false,
            selectText:"",
            hideThird:false,
        }
        this.onClickHandler = this.onClickHandler.bind(this);
        this.openSelectList = this.openSelectList.bind(this);
    }

    openSelectList(e){
       let obj = e.currentTarget.getElementsByTagName("i");
       if(obj.length > 0){
           let data = obj[0];
           data.className="anticon anticon-down cascader-picker-arrow cascader-picker-arrow-expand";
       }
       this.setState({
           hideAll:true
       })
        console.log("e===",e.currentTarget,obj);
    }
    onClickHandler(e,str){
        let content='';
        let {options} = this.props;
        let liNode = null;
        if(e.target.nodeName === 'LI'){
            content = e.target.title;
            liNode = e.target;
        }
        if(e.target.parentNode.nodeName === 'LI'){
            content = e.target.parentNode.title;
            liNode = e.target.parentNode;
        }
        let secondOptions=[];
        let thirdOptions=[];
        let hideThird = false;
        this.setState({
            secondOptions:[],
            thirdOptions:[],
            selectText:""
        })
        if(e.target.nodeName === "INPUT"){
            switch(str){
                case "first":
                    options.map((item) => {
                        if(item["value"] == content){
                            item.checked = item.checked ? false : true;
                            item["children"].map((data) => {
                                data.checked = data.checked ? false : true;
                                data["children"].map((info) =>{
                                    info.checked = info.checked ? false : true;
                                })
                            })
                        }
                    })

                    break;
                case "second":
                    options.map((item) => {
                        item["children"].map((data)=>{
                            if(data["value"] == content){
                                data.checked = data.checked ? false : true;
                                data["children"].map((info) => {
                                    info.checked = info.checked ? false : true;
                                })
                            }
                        })
                    });
                    options.map((item)=>{
                        let index = item["children"].findIndex(info => info.checked == true);
                        console.log("index===",index)
                        item.checked = index > -1 ? true : false;
                    })
                    break;
                case "third":
                    options.map((item) => {
                        item["children"].map((data)=>{
                            data["children"].map((info) => {
                                if(info["value"] == content){
                                    info.checked = info.checked ? false : true;
                                }
                            })
                            let index = data["children"].findIndex(info => info.checked == true);
                            data.checked = index > -1 ? true : false;
                        })
                        let index = item["children"].findIndex(info => info.checked == true);
                        item.checked = index > -1 ? true : false;
                    });
                    break;
            }
        }

        if(e.target.nodeName !== "INPUT") {
            options.map((item) => {
                if(item["value"] == content){
                    item["children"].map((data)=>{
                        secondOptions.push(data);
                        thirdOptions=[];
                        hideThird = true;
                    })
                }else{
                    item["children"].map((data)=>{
                        if(data["value"] == content){
                            data["children"].map((info)=>{
                                thirdOptions.push(info);
                            })
                        }
                    })
                }
            })
        }
        let flag = true;
        let nodeList = liNode.parentNode.childNodes;
        if(str == "third"){
            // flag  = false;
            for(let i=0;i<nodeList.length;i++){
                if(nodeList[i].title == content){
                    nodeList[i].className = "cascader-menu-item cascader-menu-item-active"
                }else{
                    nodeList[i].className = "cascader-menu-item"
                }
            }
        }else{
            if(str == "second"){
                let ulNodeList = e.currentTarget.parentNode.childNodes;
                let liNodeList = ulNodeList[ulNodeList.length-1].childNodes;
                for(let i=0;i<liNodeList.length;i++){
                    liNodeList[i].className = "cascader-menu-item";
                }
            }
            if(str == "first"){
                let ulNodeList = e.currentTarget.parentNode.childNodes;
                for(let j=1;j<ulNodeList.length;j++){
                    let liNodeList = ulNodeList[j].childNodes;
                    for(let i=0;i<liNodeList.length;i++){
                        if(j==1){
                            liNodeList[i].className = "cascader-menu-item cascader-menu-item-expand";
                        }else{
                            liNodeList[i].className = "cascader-menu-item";
                        }

                    }
                }
            }
            for(let j=0;j<nodeList.length;j++){
                if(nodeList[j].title == content){
                    nodeList[j].className = "cascader-menu-item cascader-menu-item-expand cascader-menu-item-active"
                }else{
                    nodeList[j].className = "cascader-menu-item cascader-menu-item-expand"
                }
            }
        }
        let selectTxt = this.state.selectText != "" ? this.state.selectText+content +"/": content + "/";
        this.setState({
            secondOptions:secondOptions.length > 0 ? secondOptions:this.state.secondOptions,
            thirdOptions:thirdOptions.length > 0 ? thirdOptions:this.state.thirdOptions,
            hideAll:flag,
            selectText:selectTxt,
            hideThird:hideThird,
        })
    }
    render(){
        console.log("测试开始======",this.props)
        const { options } = this.props;
        return(
            <div>
                <span className="cascader-picker" onClick={this.openSelectList}>
                    <span className="cascader-picker-label"/>
                    <input type="text" className="simple-input cascader-input "
                           value="" readOnly="" autoComplete="off"
                           placeholder="Please select"/>
                    <i className="anticon anticon-down cascader-picker-arrow"/>
                </span>
                {
                    this.state.hideAll ? <div className="cascader-menus">
                            <div>
                                <ul className="cascader-menu" onClick={(e)=>this.onClickHandler(e,"first")}>
                                    {
                                        options.map((item)=>{
                                            return(
                                                <li className="cascader-menu-item cascader-menu-item-expand" title={item["value"]}>
                                                    <input type="checkbox" className="check_select" checked={item.checked}/>
                                                    <span>{item["value"]}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                {
                                    this.state.secondOptions.length > 0 ? <ul className="cascader-menu" onClick={(e)=>this.onClickHandler(e,"second")}>{
                                            this.state.secondOptions.map((item) => {
                                                return(
                                                    <li className="cascader-menu-item cascader-menu-item-expand" title={item["value"]}>
                                                        <input type="checkbox" className="check_select" checked={item.checked}/>
                                                        <span>{item["value"]}</span>
                                                    </li>
                                                )
                                            })
                                        }
                                        </ul>:null
                                }
                                {
                                    this.state.thirdOptions.length > 0 && !this.state.hideThird ?
                                        <ul className="cascader-menu" onClick={(e)=>this.onClickHandler(e,"third")}>{
                                            this.state.thirdOptions.map((item) => {
                                                return(
                                                    <li className="cascader-menu-item" title={item["value"]}>
                                                        <input type="checkbox" className="check_select" checked={item.checked}/>
                                                        <span>{item["value"]}</span>
                                                    </li>
                                                )
                                            })
                                        }
                                        </ul>:null
                                }
                            </div>
                        </div>:null
                }
            </div>
        )
    }
}
CascadeSelect.propTypes= {
    options: PropTypes.array.isRequired
}