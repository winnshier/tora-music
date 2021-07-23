import { View, Image, Text } from "@tarojs/components"

import './index.scss'

interface childProps {
  img: string,
  text: string,
  tipRight?: string | number,
  RenderTipRight?: object
  RenderTipLeft?: object
}

const ImgText: React.FC<childProps> = (props) => {
  let tipLeft :any = props.RenderTipLeft
  let tipRight :any = props.RenderTipRight
  
  return (
    <View className='item-block'>
      <Image className='scroll-img' src={props.img}></Image>
      <View className='fs26 ellipsis2 sub-title c333'>{props.text}</View>
      <View className='fsbc top-tip'>
        {
          tipLeft || (
            <View></View>
          )
        }
        {
          tipRight || (
            <View className='tip-r fsc'>
              <Text className='iconfont'>&#xe61e;</Text>
              <Text>{props.tipRight}</Text>
            </View>
          )
        }
        
      </View>
    </View>
  )
}

export default ImgText