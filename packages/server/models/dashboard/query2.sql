SELECT 
* 
from
(SELECT 
    COUNT(amount) as todayCount, 
    SUM(amount) as todayAmount 
from `order` o 
WHERE o.created_at BETWEEN '{0}' AND '{1}') t1,

(SELECT 
    COUNT(amount) as weekCount, 
    SUM(amount) as weekAmount 
from `order` o 
WHERE o.created_at BETWEEN '{2}' AND '{3}') t2,

(SELECT 
    COUNT(amount) as monthCount, 
    SUM(amount) as monthAmount 
from `order` o 
WHERE o.created_at BETWEEN '{4}' AND '{5}') t3