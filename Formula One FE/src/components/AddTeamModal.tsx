import React from "react";
import { Modal, Form, Input, Button, message, InputNumber } from "antd";
import { teamAPI } from "../api/services";

const AddTeamModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await teamAPI.addTeam(values);
      message.success("Team added successfully!");
      form.resetFields();
      onClose();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Failed to add team");
    }
  };

  return (
    <Modal open={open} onCancel={onClose} title="Add Team" footer={null} destroyOnClose>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item name="country" label="Country" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item name="description" label="Description"><Input /></Form.Item>
        <Form.Item name="teamPrincipal" label="Team Principal"><Input /></Form.Item>
        <Form.Item
          name="foundedYear"
          label="Founded Year"
          rules={[{ required: true, type: 'number', message: 'Please enter a valid year' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="logoUrl" label="Logo URL"><Input /></Form.Item>
        <Form.Item name="baseLocation" label="Base Location"><Input /></Form.Item>
        <Form.Item name="engineSuppliers" label="Engine Suppliers"><Input /></Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Add Team</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTeamModal; 