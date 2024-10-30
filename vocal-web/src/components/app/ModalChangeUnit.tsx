import { useUserUnit } from '@/hooks/useUserUnit'
import { httpClient } from '@/services/httpClient'
import { Form, Input, Modal, ModalProps, notification } from 'antd'
import { FC, useEffect } from 'react'

export const ModalChangeUnit: FC<ModalProps & { unitId?: string }> = ({ unitId, ...props }) => {
  const [form] = Form.useForm()
  const { refetchUserUnit } = useUserUnit()

  const onFinish = async (values) => {
    if (unitId) await httpClient.put(`/unit/${unitId}`, values)
    else await httpClient.post('/unit', values)

    notification.success({ message: 'Success' })
    props.onCancel({} as any)
    form.resetFields()
    refetchUserUnit()
  }

  useEffect(() => {
    if (!unitId) return

    httpClient.get(`/unit/${unitId}`).then((res) => {
      form.setFieldsValue(res.data)
    })
  }, [unitId])

  return (
    <Modal
      {...props}
      title={unitId ? 'Edit Unit' : 'Create Unit'}
      onOk={() => form.submit()}
      onCancel={() => {
        props.onCancel({} as any)
        form.resetFields()
      }}
      centered
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}
