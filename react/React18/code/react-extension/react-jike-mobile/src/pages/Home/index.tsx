import './style.css'
import { Tabs } from 'antd-mobile'
import { useTabs } from './useTabs'
import HomeList from './components/List'

const Home = () => {
    const { channels } = useTabs()
    return <div>
        <div className="tabContainer">
            {/* tab区域 */}
            <Tabs defaultActiveKey={'0'}>
                {channels.map(item => <Tabs.Tab title={item.name} key={item.id}>
                    <div className="listContainer">
                        {/* HomeList列表 */}
                        <HomeList channelId={''+item.id}/>
                    </div>
                </Tabs.Tab>)}
            </Tabs>
        </div>
    </div>
}

export default Home