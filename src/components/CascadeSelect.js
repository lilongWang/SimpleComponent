/**
 * Created by houdong on 2017/10/30.
 */
import React,{ Component,PropTypes} from 'react';
import '../css/CacadeSelect.css';

export default class CascadeSelect extends Component{
    constructor(props){
        super(props);
        this.state={
            secondOptions:[],
            thirdOptions:[],
            hideAll:true,
            selectText:"",
            hideThird:false,
        }
        this.onClickHandler = this.onClickHandler.bind(this);
    }
    onClickHandler(e,str){
        let content='';
        let {options} = this.props;
        if(e.target.nodeName === 'LI'){
            content = e.target.title;
        }
        if(e.target.parentNode.nodeName === 'LI'){
            content = e.target.parentNode.title;
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
        // if(str == "third"){
        //     flag  = false;
        // }
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
        const { options } = this.props;
        return(
            <div>
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
    options: PropTypes.array.isRequired,
}