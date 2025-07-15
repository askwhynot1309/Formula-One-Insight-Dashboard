import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message, InputNumber } from "antd";
import { teamAPI } from "../api/services";

interface UpdateTeamModalProps {
  open: boolean;
  onClose: () => void;
  team: any; // Should match the TeamDetails type
  onUpdated: () => void;
}

const UpdateTeamModal: React.FC<UpdateTeamModalProps> = ({ open, onClose, team, onUpdated }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && team) {
      form.setFieldsValue(team);
    }
  }, [open, team, form]);

  const onFinish = async (values: any) => {
    try {
      await teamAPI.updateTeam(team.id, values);
      message.success("Team updated successfully!");
      onUpdated();
      onClose();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Failed to update team");
    }
  };

  return (
    <Modal open={open} onCancel={onClose} title="Update Team" footer={null} destroyOnClose>
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
          <Button type="primary" htmlType="submit" block>Update Team</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTeamModal; 