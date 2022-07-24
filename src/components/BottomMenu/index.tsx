import React from 'react'
import Li from '../Li'

import {FaRegHeart, IoCartOutline, RiHome2Line, BiUser, MdMenu, VscHome} from "../../../icons"
import Badge from '../Badge'

interface Props {
    setShowSideBar:React.Dispatch<React.SetStateAction<boolean>>
}

function BottomMenu({setShowSideBar}:Props) {
  return (
    <div className='w-full h-[50px] flex justify-center items-center fixed bottom-0 bg-white md:hidden'>
        <div className='flex items-center w-full justify-evenly gap-4 text-gray'>
            <Li href='/profile'>
                <BiUser fontSize={24}/>
            </Li>
            <MdMenu fontSize={24} onClick={()=>setShowSideBar(true)}/>
            <Li href='/'>
                <VscHome fontSize={32}/>
            </Li>
            <Li href='/saved'>
              <div className='relative'>
                <FaRegHeart fontSize={24}/>
                <Badge number={2}/>
              </div>
            </Li>
            <Li href='/cart'>
              <div className='relative'>
                <IoCartOutline fontSize={24}/>
                <Badge number={5}/>
              </div>
            </Li>
          </div>
    </div>
  )
}

export default BottomMenu