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
  // 随机歌曲
  const [randomSong, setRandomSong] = useState<any>({})
  useEffect(() => {
    http.get('/homepage/block/page', {refresh: true}).then((res) => {
      let data = res.data.data
      setBannersList(data.blocks[0].extInfo.banners)
      setRecommendPlaylist(data.blocks[1].creatives)
      setRandomSong(data.blocks[5])
      console.log(data.blocks[5].creatives);
      
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
      {/* 随机歌曲 */}
      <View className='pd30 bgc-w mt20'>
        <View className='fsbc'>
          <View className='fs34 bold'>{randomSong?.uiElement?.subTitle.title}</View>
        </View>
        <View>
          <Swiper
            className='random-song'
            circular
            nextMargin="35rpx">
              {
                randomSong.creatives?.map(item => {
                  return(
                    <SwiperItem className="">
                      {
                        item?.resources.map(song => {
                          return(
                            <View className='fsc mt20 song-item'>
                              <Image className='item-img' src={song.uiElement.image.imageUrl}></Image>
                              <View className='ml20'>
                                <View className='fs32'>{song.uiElement?.mainTitle?.title}<Text className='fs26 c666'> - {song.resourceExtInfo.artists[0].name}</Text></View>
                                <View className='fs28 c666'>{song.uiElement?.subTitle?.title}</View>
                              </View>
                            </View>
                          )
                        })
                      }
                    </SwiperItem>
                  )
                })
              }
          </Swiper>
        </View>
      </View>
    </View>
  )
}
export default Found