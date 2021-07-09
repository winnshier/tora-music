import { Swiper, SwiperItem, View, Image } from "@tarojs/components"
import { useEffect, useState } from "react"

import http from '../../utils/request'

import './index.scss'

function Found() {
  const [bannersList, setBannersList] = useState([])
  useEffect(() => {
    http.get('/homepage/block/page').then((res) => {
      let data = res.data.data
      setBannersList(data.blocks[0].extInfo.banners)
    })
  }, [])
  let swiperItem = bannersList.map(item => {
    return (
      <SwiperItem className="" key={item.bannerId}>
        <View className='newsong-item p-r'>
          <Image className='item-img' src={item.pic}></Image>
          <View className='type-title bgc-ctc'>{item.typeTitle}</View>
        </View>
      </SwiperItem>
    )
  })
  
  return (
    <View>
      <View className='swiper-block mt20'>
        <Swiper
          className='newsong'
          circular
          autoplay>
            { swiperItem }
        </Swiper>
      </View>
    </View>
  )
}
export default Found