import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Select,
  InputNumber,
  DatePicker,
  Row,
  Col,
} from "antd";
import { driverAPI, teamAPI } from "../api/services";
import { useApi } from "../hooks/useApi";
import moment from "moment";

const { Option } = Select;

interface UpdateDriverModalProps {
  open: boolean;
  onClose: () => void;
  driver: any; // Should match the DriverDetails type
  onUpdated: () => void;
}

const UpdateDriverModal: React.FC<UpdateDriverModalProps> = ({ open, onClose, driver, onUpdated }) => {
  const [form] = Form.useForm();
  const { data: teams } = useApi(teamAPI.getTeams);

  useEffect(() => {
    if (open && driver) {
      const initialValues = {
        ...driver,
        dateOfBirth: driver.dateOfBirth ? moment(driver.dateOfBirth) : null,
      };
      form.setFieldsValue(initialValues);
    }
  }, [open, driver, form]);

  const onFinish = async (values: any) => {
    try {
      if (values.dateOfBirth) {
        values.dateOfBirth = values.dateOfBirth.format("YYYY-MM-DD");
      }
      await driverAPI.updateDriver(driver.id, values);
      message.success("Driver updated successfully!");
      onUpdated();
      onClose();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Failed to update driver");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Update Driver"
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="number" label="Number" rules={[{ required: true, type: "number", message: "Please enter a valid number" }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="nationality" label="Nationality" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="raceWin" label="Race Win" rules={[{ required: true, type: "number", message: "Please enter a valid number" }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="raceStart" label="Race Start" rules={[{ required: true, type: "number", message: "Please enter a valid number" }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true, message: "Please select a date of birth" }]}>
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="imageUrl" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="debutYear" label="Debut Year" rules={[{ required: true, type: "number", message: "Please enter a valid number" }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select a status" }]}> 
              <Select placeholder="Select status">
                <Option value="Active">Active</Option>
                <Option value="Retired">Retired</Option>
              </Select>
            </Form.Item>
            <Form.Item name="podiums" label="Podiums" rules={[{ required: true, type: "number", message: "Please enter a valid number" }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="poles" label="Poles" rules={[{ required: true, type: "number", message: "Please enter a valid number" }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="fastestLaps" label="Fastest Laps" rules={[{ required: true, type: "number", message: "Please enter a valid number" }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="teamId" label="Team" rules={[{ required: true, message: "Please select a team" }]}> 
              <Select placeholder="Select a team">
                {teams?.map((team) => (
                  <Option key={team.id} value={team.id}>{team.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>Update Driver</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateDriverModal; 