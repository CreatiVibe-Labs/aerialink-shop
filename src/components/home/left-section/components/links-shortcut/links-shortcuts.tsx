import { BsChatLeftDots } from 'react-icons/bs'
import { FiPhone } from 'react-icons/fi'
import { LuMessageCircleQuestion } from 'react-icons/lu'
import { TbMessageCircleExclamation } from 'react-icons/tb'
import LinkShotcutList from './link-shotcut-list'

const LinksShortcuts = () => {
  return (
    <div className='rounded-xl border border-light-gray p-3 space-y-2'>
        <LinkShotcutList icon={<BsChatLeftDots />} label='Live chat'/>
        <LinkShotcutList icon={<FiPhone />} label='Contact us'/>
        <LinkShotcutList icon={<LuMessageCircleQuestion />} label='FAQs'/>
        <LinkShotcutList icon={<TbMessageCircleExclamation />} label='Submit Complaint'/>
    </div>
  )
}

export default LinksShortcuts