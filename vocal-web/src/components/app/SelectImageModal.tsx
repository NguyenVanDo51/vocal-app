import { Modal, ModalProps, notification } from 'antd'
import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { searchImages } from '@/lib/imageSearch'
import clsx from 'clsx'
import { Search } from 'lucide-react'

export const SelectImageModal: React.FC<
  ModalProps & { onFinish: (selectedImage: string) => void; key?: string; initialValue?: string }
> = ({ ...props }) => {
  const [keyWord, setKeyWord] = useState('')
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState('')

  const handleSeach = () => {
    searchImages(keyWord).then((imageObj) => {
      if (imageObj.length === 0) {
        notification.info({ message: 'No images found' })
        return
      }

      setImages(imageObj.map((item) => item.src.small))
      setSelectedImage(imageObj[0].src.small)
    })
  }

  console.log('props', props)

  useEffect(() => {
    if (props.initialValue) {
      setKeyWord(props.initialValue)
    }
  }, [props.initialValue])

  useEffect(() => {
    setKeyWord('')
    setImages([])
    setSelectedImage('')
  }, [props.key])

  return (
    <Modal
      {...props}
      onOk={() => {
        props.onFinish(selectedImage)
        props.onCancel({} as any)
      }}
      width={544}
      title="Select Image"
      centered
    >
      <div className="flex flex-col gap-8 py-2">
        <div className="flex gap-4">
          <Input
            placeholder="Search"
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSeach()
              }
            }}
          />
          <Button size="sm" className="px-4 sm:px-8" onClick={() => handleSeach()}>
            <Search />
            <div className="hidden md:inline">Search</div>
          </Button>
        </div>

        <div className="flex flex-wrap justify-start gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={clsx(
                'w-28 h-28 rounded-md overflow-hidden cursor-pointer',
                selectedImage === image && 'border-4 border-primary'
              )}
            >
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover"
                onClick={() => setSelectedImage(image)}
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
