---
name: "Sharing Data with CatalystNeuro"
description: "Instructions for uploading your data to our size-unrestricted Google Drive folder using Globus"
type: "guide"
docs: "/guides/globus-guide.md"
---

#### Thank you for sharing your data with the CatalystNeuro team!

Here are some step-by-step instructions for how to utilize Globus to upload your data to our size-unrestricted Google Drive folder.

## Step 1: Download Globus Personal Endpoint

If your institution or lab already has a non-personal endpoint on which you have transfer permissions, you can skip this step and go to Step 2. Otherwise…

1. Go to [globus.org/globus-connect-personal](https://www.globus.org/globus-connect-personal) and download+install your platform-specific version.
2. When it is installed, go ahead and launch it to activate the endpoint.

## Step 2: Setup Transfer Destination

1. Start by going to [globus.org](https://www.globus.org) and creating an account. If you already have an account, go to the next step.
2. Send your account name to Ben at ben.dichter@catalystneuro.com so he can add your credentials to the system.
3. Now login to [globus.org](https://www.globus.org) or follow the link in the credential notification email.
4. You should see a blank interface.
   ![alt text](/images/software/guides/globus/image4.png)
5. For the first 'Collection', select 'bdichter_LBNL_drive' (this may have been automatically chosen for you if you followed the link from the credential notification). Then, navigate the 'Path' to the corresponding subdirectory we have created for your lab. Navigation can be performed by directly typing the path into the field (if known) or double-clicking the folders in the main box.
    ![alt text](/images/software/guides/globus/image6.png)

For example, I navigated to the 'buzsaki-data-share' folder.

**Debugging Step 2**: If the main box displays a credential error at any point during this step, try:
1. Hitting the "Try Again" box below the error
2. The "refresh list" icon in the box menu
3. Refresh the webpage
4. Try logging out of Globus and retrying from the start of Step 2

Your credentials have been added, but the system can be a bit finicky at times.

## Step 3: Setup Transfer Source

Now we will do something very similar for the source data.

1. If you do not see a second menu on the right half of the interface, you may have to select the "Transfer or Sync to..." button to force it to show
    ![alt text](/images/software/guides/globus/image1.png)
You should now see two side-by-side Collection+Path menus.
    ![alt text](/images/software/guides/globus/image3.png)
2. For the second 'Collection', set this to your named endpoint that is active on the system that has access to the source data files/folders.
3. Navigate to the outermost folder location of the data you wish to share, and click on the folder you wish to transfer.
    ![alt text](/images/software/guides/globus/image9.png)
For example, I have an endpoint named 'Desktop', I navigated to the folder 'BuzsakiData', and selected the folder 'TingleyD'
4. Now press the blue 'Start' button, and the transfer should begin! You can confirm data is transferring via the 'Activity' tab from the left-most navigation bar.

### ⚠️ WARNING:
**DO NOT** press the 'Upload' button next to the cloud icon.
    ![alt text](/images/software/guides/globus/image5.jpg)
The drag-and-drop interface this utilizes is distinct from the formal transfer tool and will:
- Fail credential access
- Miss data engineering benefits for multiple or very large files

### Debugging Step 3
If you noticed that your Globus endpoint, though installed and active on the correct system, is unable to navigate to the desired folders, there are two typical solutions:

**For Windows/MacOS:**
1. Open the 'options' for the GlobusConnectPersonal app from the system toolbar
    ![alt text](/images/software/guides/globus/image7.png)
2. The first window that pops up in the options ought to be 'Access'
    ![alt text](/images/software/guides/globus/image10.png)
3. By default the root of the access will be wherever the app was first installed and run
    ![alt text](/images/software/guides/globus/image8.png)
4. To add a new access location, use the '+' button
5. Select which drives or sub-folders you wish to grant Globus access to
6. Refresh the web interface, and the new locations should appear

**For Linux:**
You likely launched the personal endpoint via the command line, in which case you may need to grant access to mounted volumes using the `-restrict-shared-paths <path to add access to>` when activating the endpoint.
