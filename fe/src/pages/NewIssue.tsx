import React, { useState } from 'react';

import NewIssueMain from '../components/NewIssue/NewIssueMain';
import NewIssueNav from '../components/NewIssue/NewIssueNav';
import { BASE_API } from 'src/api';
import { Options } from '../components/NewIssue/NewIssueOptions';
import { useNavigate } from 'react-router-dom';

const dummyData = {
  user: {
    userId: 1,
    userName: 'Lily',
    profileUrl:
      'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  userList: [
    {
      userId: 1,
      userName: 'Lily',
      profileUrl: '111',
    },
    {
      userId: 2,
      userName: 'Lily',
      profileUrl: '111',
    },
    {
      userId: 3,
      userName: 'Lily',
      profileUrl: '111',
    },
    {
      userId: 4,
      userName: 'Lily',
      profileUrl: '111',
    },
  ],
  labelList: [
    {
      labelId: 1,
      labelName: 'bug',
      backgroundColor: 'tomato',
      fontColor: '#FFFFFF',
    },
    {
      labelId: 2,
      labelName: 'FE',
      backgroundColor: 'pink',
      fontColor: '#FFFFFF',
    },
    {
      labelId: 3,
      labelName: 'document',
      backgroundColor: '#FF2011',
      fontColor: '#FFFFFF',
    },
  ],
  milestoneList: [
    {
      milestoneId: 1,
      milestoneName: 'FE',
      progress: 50,
    },
    {
      milestoneId: 2,
      milestoneName: 'BE',
      progress: 10,
    },
  ],
};

const NewIssue: React.FC = () => {
  const [issueTitle, setIssueTitle] = useState('');
  const [issueContent, setIssueContent] = useState('');
  const [options, setOptions] = useState<Options>({
    assignee: 0,
    label: 0,
    milestone: 0,
  });
  const issueStates = {
    issueTitle,
    setIssueTitle,
    issueContent,
    setIssueContent,
  };
  const optionsState = {
    options,
    setOptions,
  };
  const isChanged = Boolean(
    issueTitle || issueContent || Object.values(options).some(value => value)
  );
  const navigate = useNavigate();

  const moveToHome = () => {
    navigate('/');
  };

  const newIssueData = () => {
    const assignee = options.assignee ? [{ userId: options.assignee }] : null;
    const label = options.label ? [{ labelId: options.label }] : null;
    const milestone = options.milestone ? options.milestone : null;

    return {
      title: issueTitle,
      content: issueContent,
      userId: dummyData.user.userId,
      userList: assignee,
      labelList: label,
      milestoneId: milestone,
    };
  };

  const postNewIssue = async () => {
    const temp = await fetch(`${BASE_API}issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIssueData()),
    });
    if (temp.ok) {
      setIssueTitle('');
      setIssueContent('');
      moveToHome();
    }
  };

  return (
    <div>
      <header className="text-2xl text-gray-900">새로운 이슈 작성</header>
      <NewIssueMain
        user={dummyData.user}
        userList={dummyData.userList}
        labelList={dummyData.labelList}
        milestoneList={dummyData.milestoneList}
        issueStates={issueStates}
        optionsState={optionsState}
      />
      <NewIssueNav
        isChanged={isChanged}
        onCancelClick={moveToHome}
        onSubmitClick={postNewIssue}
      />
    </div>
  );
};

export default NewIssue;