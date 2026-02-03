from cvat.memberships.types import MembershipReadRequest
from cvat.sdk import cvat

print(cvat.memberships.find_all(MembershipReadRequest(org_id=6)))
