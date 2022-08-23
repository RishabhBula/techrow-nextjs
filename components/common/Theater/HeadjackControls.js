import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Menu, Dropdown, Badge } from "antd";
import { DownOutlined } from "@ant-design/icons";

import {
  onSelectedDevicesChange,
  sendAction
} from "redux/actions/HeadjackControls"

const HeadjackControls = () => {

  const dispatch = useDispatch();
  const individualData = useSelector((state) => state.HeadjackControlsReducer.individualData);
  const selectedDevices = useSelector((state) => state.HeadjackControlsReducer.selectedDevices);

  const menu = (
    <Menu onClick={(e) => dispatch(sendAction(e.key))}>
      <Menu.Item
        key="play"
        disabled={selectedDevices.length == 0 ? true : false}
      >
        <a rel='noopener noreferrer'>Play Project</a>
      </Menu.Item>
      <Menu.Item
        key="pause"
        disabled={selectedDevices.length == 0 ? true : false}
      >
        <a rel='noopener noreferrer'>Pause Playback</a>
      </Menu.Item>
      <Menu.Item
        key="resume"
        disabled={selectedDevices.length == 0 ? true : false}
      >
        <a rel='noopener noreferrer'>Resume Playback</a>
      </Menu.Item>
      <Menu.Item
        key="stop"
        disabled={selectedDevices.length == 0 ? true : false}
      >
        <a rel='noopener noreferrer'>Stop Playback</a>
      </Menu.Item>
      {/*<Menu.Item key="headjackControls/download" disabled={selectedDevices.length==0 ? true : false}>
          <a rel="noopener noreferrer">
            Download Project
          </a>
        </Menu.Item>
        <Menu.Item key="headjackControls/cancel" disabled={selectedDevices.length==0 ? true : false}>
          <a rel="noopener noreferrer">
            Stop Download
          </a>
        </Menu.Item>*/}
    </Menu>
  );

  const statuses = {
    playing: "Playing",
    paused: "Paused",
  };

  const columns = [
    {
      title: "Name",
      render: (item) => {
        return <a>{item.persistentData.deviceModel}</a>;
      },
    },
    {
      title: "Status",
      render: (item) => {
        return (
          <a>
            {item.status.name == "idle" ? (
              <Badge color='#B1F543' text='Connected' />
            ) : (
              <Badge color='blue' text={statuses[item.status.name]} />
            )}
          </a>
        );
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectedDevices,
    onChange: (selectedRowKeys, selectedRows) => { 
      dispatch(onSelectedDevicesChange(selectedRowKeys)) 
    }
  };

  return (
    <Fragment>
      <div
        className="row"
        style={{ textAlign: "right", padding: "30px", display: "block" }}
      >
        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link" href="#">
            Select Action <DownOutlined />
          </a>
        </Dropdown>
      </div>
      <div className="headset-list">
        <Table
          locale={{
            emptyText: <span>Waiting for first device to connect.</span>,
          }}
          rowKey={(item) => {
            return item.id;
          }}
          rowSelection={rowSelection}
          columns={columns}
          pagination={{ hideOnSinglePage: true, pageSize: 20 }}
          dataSource={individualData}
        />
      </div>
    </Fragment>
  );
}

export default HeadjackControls;
