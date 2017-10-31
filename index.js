/**
 * Created by houdong on 2017/10/30.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import CascadeSelect from './src/components/CascadeSelect';

let options=[
    {
        value: '江苏省',
        label: '江苏省',
        key:"key_1",
        checked:false,
        children: [
            {
                value: '徐州市',
                label: '徐州市',
                key:'key_10',
                checked:false,
                children: [
                    {
                        value: '丰县',
                        label: '丰县',
                        key:'key_101',
                        checked:false,
                    },
                    {
                        value: '邳州市',
                        label: '邳州市',
                        key:'key_102',
                        checked:false,
                    },
                    {
                        value: '新沂市',
                        label: '新沂市',
                        key:'key_103',
                        checked:false,
                    }
                ],
            },
            {
                value: '苏州市',
                label: '苏州市',
                key:'key_11',
                checked:false,
                children: [
                    {
                        value: '工业园区',
                        label: '工业园区',
                        key:'key_110',
                        checked:false,
                    },
                    {
                        value: '相城区',
                        label: '相城区',
                        key:'key_111',
                        checked:false,
                    },
                    {
                        value: '吴中区',
                        label: '吴中区',
                        key:'key_112',
                        checked:false,
                    }
                ],
            }
        ],
    },
    {
        value:'山东省',
        label:'山东省',
        key:'key_2',
        checked:false,
        children:[
            {
                value:'济南市',
                label:'济南市',
                key:'key_20',
                checked:false,
                children:[
                    {
                        value:'历下区',
                        label:'历下区',
                        key:'key_201',
                        checked:false,
                    }
                ]
            }
        ]
    }
]

export default class Main extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
                <CascadeSelect options={options}/>
        )
    }
}
ReactDOM.render(<Main/>,document.getElementById("app"));