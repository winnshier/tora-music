import { Swiper, SwiperItem, View, Image, ScrollView, Text } from "@tarojs/components"
import { useEffect, useState } from "react"

import http from '../../utils/request'
import util from '../../utils/utils'

import ImgText from '../../components/ImgText/index'

import './index.scss'

function Found() {
  // banner图
  const [bannersList, setBannersList] = useState<any[]>([])
  // 推荐歌单
  const [recommendPlaylist, setRecommendPlaylist] = useState<any[]>([])
  useEffect(() => {
    http.get('/homepage/block/page').then((res) => {
      let data = res.data.data
      setBannersList(data.blocks[0].extInfo.banners)
      setRecommendPlaylist(data.blocks[1].creatives)
    })
  }, [])
  let swiperItem = bannersList.map(item => {
    return (
      <SwiperItem className="" key={item.bannerId}>
        <View className='newsong-item p-r'>
          <Image className='item-img' src={item.pic}></Image>
          <View className='type-title bgc-ctc'>
            {item.typeTitle}
          </View>
        </View>
      </SwiperItem>
    )
  })

  let scrollItem = recommendPlaylist.map(item => {
    return(
      <ImgText
        img={item.uiElement.image.imageUrl}
        text={item.uiElement.mainTitle.title}
        tipRight={util.getPlayCount(item.resources[0].resourceExtInfo.playCount)}
      ></ImgText>
    )
  })
  
  return (
    <View>
      {/* banner图 */}
      <View className='swiper-block bgc-w'>
        <Swiper
          className='newsong'
          circular
          autoplay>
            { swiperItem }
        </Swiper>
      </View>
      {/* 推荐歌单 */}
      <View className='reco-block pd30 bgc-w'>
        <View className='fsbc'>
          <View className='fs34 bold'>推荐歌单</View>
          <View className='fs28'>更多</View>
        </View>
        <View className='mt30'>
          <ScrollView className='fss' enableFlex scrollX >{ scrollItem }</ScrollView>
        </View>
      </View>
    </View>
  )
}
export default Found